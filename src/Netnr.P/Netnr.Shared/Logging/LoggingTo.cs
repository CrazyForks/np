﻿#if Full || Logging

using System.Collections.Concurrent;
using Microsoft.Data.Sqlite;

namespace Netnr
{
    /// <summary>
    /// 日志
    /// </summary>
    public class LoggingTo
    {
        /// <summary>
        /// 数据库文件分割类型（由于附加数据库有限制，默认 OptionsDbMaxAttach 个，所以一次最多能查询 OptionsDbMaxAttach + 1 个库）
        /// </summary>
        public enum DBPartType
        {
            /// <summary>
            /// 不分
            /// </summary>
            None,
            /// <summary>
            /// 按年分割，如：2020/log.db，最大查询 OptionsDbMaxAttach 年
            /// </summary>
            Year,
            /// <summary>
            /// 按月分割，如：2020/04/log.db，最大查询 OptionsDbMaxAttach 个月
            /// </summary>
            Month,
            /// <summary>
            /// 按日分割，如：2020/04/16/log.db，最大查询 OptionsDbMaxAttach 天
            /// </summary>
            Day
        }

        /// <summary>
        /// 数据库目录
        /// </summary>
        public static string OptionsDbRoot { get; set; } = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "logs");

        /// <summary>
        /// 数据库文件名
        /// </summary>
        public static string OptionsDbFileName { get; set; } = "log.db";

        /// <summary>
        /// 表名
        /// </summary>
        public static string OptionsDbTableName { get; set; } = "LoggingModel";

        /// <summary>
        /// 数据库文件分割，默认按年
        /// </summary>
        public static DBPartType OptionsDbPart { get; set; } = DBPartType.Year;

        /// <summary>
        /// 数据库附加限制，默认 max 30
        /// </summary>
        public static int OptionsDbMaxAttach { get; set; } = 30;

        /// <summary>
        /// 当前缓存日志
        /// </summary>
        public static ConcurrentQueue<LoggingModel> CurrentCacheLog { get; set; } = new ConcurrentQueue<LoggingModel>();

        /// <summary>
        /// 写入标记
        /// </summary>
        static readonly object WriteMark = new();

        /// <summary>
        /// 路径转连接字符串
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static string PathToConn(string path)
        {
            return $"Data Source={path}";
        }

        /// <summary>
        /// 获取数据库分片路径
        /// </summary>
        /// <returns></returns>
        public static string GetDbPartFormat()
        {
            var ctf = string.Empty;
            switch (OptionsDbPart)
            {
                case DBPartType.Year:
                    ctf = "yyyy";
                    break;
                case DBPartType.Month:
                    ctf = "yyyy'/'MM";
                    break;
                case DBPartType.Day:
                    ctf = "yyyy'/'MM'/'dd";
                    break;
            }

            return ctf;
        }

        /// <summary>
        /// 创建数据库
        /// </summary>
        /// <param name="path"></param>
        public static void CreateDatabase(string path)
        {
            File.WriteAllBytes(path, Array.Empty<byte>());

            var createTableSql = @"
                CREATE TABLE ""LoggingModel"" (
                  ""LogId"" varchar(36) NOT NULL,
                  ""LogApp"" varchar(36),
                  ""LogUid"" varchar(36),
                  ""LogNickname"" varchar(36),
                  ""LogAction"" varchar(200),
                  ""LogContent"" varchar(4000),
                  ""LogUrl"" varchar(2000),
                  ""LogReferer"" varchar(2000),
                  ""LogIp"" varchar(100),
                  ""LogArea"" varchar(200),
                  ""LogUserAgent"" varchar(500),
                  ""LogBrowserName"" varchar(100),
                  ""LogSystemName"" varchar(100),
                  ""LogGroup"" varchar(2),
                  ""LogLevel"" varchar(10),
                  ""LogCreateTime"" bigint,
                  ""LogRemark"" varchar(200),
                  ""LogSpare1"" varchar(200),
                  ""LogSpare2"" varchar(200),
                  ""LogSpare3"" varchar(200)
                );

                CREATE INDEX ""LoggingModel_LogAction""
                ON ""LoggingModel""(
                  ""LogAction"" ASC
                );

                CREATE INDEX ""LoggingModel_LogCreateTime""
                ON ""LoggingModel""(
                  ""LogCreateTime"" ASC
                );

                CREATE INDEX ""LoggingModel_LogId""
                ON ""LoggingModel""(
                  ""LogId"" ASC
                );
            ";

            new DbHelper(new SqliteConnection(PathToConn(path))).SqlExecuteNonQuery(createTableSql);
        }

        /// <summary>
        /// 新增（队列+锁）
        /// </summary>
        /// <param name="logs">日志实体</param>
        public static void Add(IEnumerable<LoggingModel> logs)
        {
            ThreadPool.QueueUserWorkItem(_ =>
            {
                //当前缓存的日志
                logs.AsParallel().ForAll(log => CurrentCacheLog.Enqueue(log));

                //锁
                if (Monitor.TryEnter(WriteMark))
                {
                wmark:

                    //写入日志
                    var listLog = new List<LoggingModel>();
                    while (CurrentCacheLog.TryDequeue(out LoggingModel deobj))
                    {
                        listLog.Add(deobj);
                    }
                    AddNow(listLog);

                    if (!CurrentCacheLog.IsEmpty)
                    {
                        goto wmark;
                    }

                    Monitor.Exit(WriteMark);
                }
            });
        }

        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="log">日志实体</param>
        public static void Add(LoggingModel log)
        {
            Add(new List<LoggingModel> { log });
        }

        /// <summary>
        /// 新增（实时）
        /// </summary>
        /// <param name="logs">日志实体</param>
        /// <param name="autoMakeUp">自动补齐信息，默认true</param>
        public static int AddNow(IEnumerable<LoggingModel> logs, bool autoMakeUp = true)
        {
            var num = 0;

            //自动补齐信息
            if (autoMakeUp)
            {
                MakeUpLogs(ref logs);
            }

            //不分片区
            if (OptionsDbPart == DBPartType.None)
            {
                var dp = Path.Combine(OptionsDbRoot, OptionsDbFileName);

                if (!File.Exists(dp))
                {
                    CreateDatabase(dp);
                }

                if (InsertAll(dp, logs) > 0)
                {
                    num += logs.Count();
                }
            }
            else
            {
                var ctf = GetDbPartFormat();
                var igs = logs.GroupBy(x => x?.LogCreateTime.ToString(ctf));

                foreach (var ig in igs)
                {
                    //当前片区
                    var df = Path.Combine(OptionsDbRoot, ig.Key);
                    //创建目录
                    if (!Directory.Exists(df))
                    {
                        Directory.CreateDirectory(df);
                    }
                    var dp = Path.Combine(df, OptionsDbFileName);
                    //拷贝空数据库
                    if (!File.Exists(dp))
                    {
                        CreateDatabase(dp);
                    }

                    if (InsertAll(dp, ig) > 0)
                    {
                        num += ig.Count();
                    }
                }
            }

            return num;
        }

        /// <summary>
        /// 补齐日志信息
        /// </summary>
        /// <param name="logs"></param>
        public static void MakeUpLogs(ref IEnumerable<LoggingModel> logs)
        {
            logs.AsParallel().ForAll(item =>
            {
                //设置ID
                item.LogId = BitConverter.ToInt64(Guid.NewGuid().ToByteArray(), 0).ToString();

                //解析User-Agent
                if (!string.IsNullOrWhiteSpace(item.LogUserAgent))
                {
                    UserAgentParser(item.LogUserAgent, out string browserName, out string systemName, out bool isBot);
                    item.LogBrowserName = browserName;
                    item.LogSystemName = systemName;
                    if (isBot)
                    {
                        item.LogGroup = "2";
                    }
                }
            });
        }

        /// <summary>
        /// User-Agent 解析
        /// </summary>
        /// <param name="userAgent"></param>
        /// <param name="browserName"></param>
        /// <param name="systemName"></param>
        /// <param name="isBot"></param>
        public static void UserAgentParser(string userAgent, out string browserName, out string systemName, out bool isBot)
        {
            var uap = new UAParser.Parsers(userAgent);
            var clientEntity = uap.GetClient();
            var osEntity = uap.GetOS();
            var botEntity = uap.GetBot();

            browserName = clientEntity != null
                ? $"{clientEntity.Name} {clientEntity.Version}"
                : "";
            systemName = osEntity != null
                ? $"{osEntity.Name} {osEntity.Version}"
                : "";
            isBot = botEntity != null;
        }

        /// <summary>
        /// 新增SQL
        /// </summary>
        /// <param name="path"></param>
        /// <param name="list"></param>
        /// <returns></returns>
        public static int InsertAll(string path, IEnumerable<LoggingModel> list)
        {
            var listSql = new List<string>();

            var pis = new LoggingModel().GetType().GetProperties().ToList();

            var fields = string.Join(",", pis.Select(x => x.Name));

            foreach (var item in list)
            {
                var values = string.Join("','", new string[] {
                    item.LogId,
                    item.LogApp?.Replace("'","''"),
                    item.LogUid?.Replace("'","''"),
                    item.LogNickname?.Replace("'","''"),
                    item.LogAction?.Replace("'","''"),
                    item.LogContent?.Replace("'","''"),
                    item.LogUrl?.Replace("'","''"),
                    item.LogReferer?.Replace("'","''"),
                    item.LogIp?.Replace("'","''"),
                    item.LogUserAgent?.Replace("'","''"),
                    item.LogBrowserName?.Replace("'","''"),
                    item.LogSystemName?.Replace("'","''"),
                    item.LogGroup?.Replace("'","''"),
                    item.LogLevel?.Replace("'","''"),
                    item.LogCreateTime.Ticks.ToString(),
                    item.LogRemark?.Replace("'","''"),
                    item.LogSpare1?.Replace("'","''"),
                    item.LogSpare2?.Replace("'","''"),
                    item.LogSpare3?.Replace("'","''")
                });

                listSql.Add($"insert into {OptionsDbTableName} ({fields}) values ('{values}')");
            }

            return new DbHelper(new SqliteConnection(PathToConn(path))).SqlExecuteNonQuery(listSql);
        }

        /// <summary>
        /// 根据时间获取存储的路径
        /// </summary>
        /// <param name="begin">开始时间</param>
        /// <param name="end">结束时间</param>
        /// <returns></returns>
        public static List<string> GetDbPath(DateTime begin, DateTime end)
        {
            var listPath = new List<string>();

            string dp;
            //不分片区
            if (OptionsDbPart == DBPartType.None)
            {
                dp = Path.Combine(OptionsDbRoot, OptionsDbFileName);
                //分片存在
                if (File.Exists(dp))
                {
                    listPath.Add(dp);
                }
            }
            else
            {
                var ctf = GetDbPartFormat();
                do
                {
                    dp = Path.Combine(OptionsDbRoot, begin.ToString(ctf), OptionsDbFileName);

                    //分片存在
                    if (File.Exists(dp))
                    {
                        listPath.Add(dp);
                    }

                    switch (OptionsDbPart)
                    {
                        case DBPartType.Year:
                            begin = DateTime.Parse(begin.Year + "/01/01").AddYears(1).Date;
                            break;
                        case DBPartType.Month:
                            begin = DateTime.Parse(begin.Year + "/" + begin.Month + "/01").AddMonths(1).Date;
                            break;
                        case DBPartType.Day:
                            begin = begin.AddDays(1).Date;
                            break;
                    }

                } while (begin <= end);
            }

            return listPath;
        }

        /// <summary>
        /// 拿到最终查询语句
        /// </summary>
        /// <param name="begin">开始时间</param>
        /// <param name="end">结束时间</param>
        /// <param name="db">数据库对象</param>
        /// <param name="lost">丢失数据库文件</param>
        /// <param name="listPreSql">前置SQL</param>
        /// <returns></returns>
        public static string GetSqlForQuery(DateTime begin, DateTime end, out DbHelper db, out int lost, out List<string> listPreSql)
        {
            var listPath = GetDbPath(begin, end);

            if (listPath.Count == 0)
            {
                db = null;
                lost = 0;
                listPreSql = null;

                return null;
            }

            var mpath = PathToConn(listPath.FirstOrDefault());
            db = new DbHelper(new SqliteConnection(mpath));

            var listSql = new List<string>() { "select * from " + OptionsDbTableName };
            listPreSql = new List<string>();

            //附加数据库
            var adi = 1;
            while (adi <= OptionsDbMaxAttach && adi < listPath.Count)
            {
                var aliasName = "log_" + adi;

                //附加数据库
                var attachSql = "ATTACH DATABASE '" + listPath[adi].Replace("'", "''") + "' AS '" + aliasName + "'";
                listPreSql.Add(attachSql);

                listSql.Add("select * from " + aliasName + "." + OptionsDbTableName);

                adi++;
            };

            //丢失的数据库，未附加的数据库
            lost = Math.Max(0, listPath.Count - OptionsDbMaxAttach - 1);

            //最终执行SQL
            var sql = string.Join(" UNION ALL ", listSql);

            return sql;
        }

        /// <summary>
        /// 条件拼接
        /// </summary>
        /// <param name="listWhere">条件（列名、 关系符、值1、值2）</param>
        private static string ListWhereJoin(List<List<string>> listWhere)
        {
            if (listWhere != null)
            {
                var sqlWhere = new List<string>();

                var listField = new LoggingModel().GetType().GetProperties().ToList().Select(x => x.Name).ToList();
                foreach (var wi in listWhere)
                {
                    var field = wi[0];
                    var relation = wi[1].Trim();
                    var val1 = wi.Count > 2 ? wi[2] : "";
                    var val2 = wi.Count > 3 ? wi[3] : "";

                    if (listField.Contains(field))
                    {
                        switch (relation)
                        {
                            case "=":
                            case ">":
                            case ">=":
                            case "<":
                            case "<=":
                            case "!=":
                                if (!string.IsNullOrWhiteSpace(val1))
                                {
                                    sqlWhere.Add($"{field}{relation}'{val1.Replace("'", "''")}'");
                                }
                                break;
                            case "like":
                                if (!string.IsNullOrWhiteSpace(val1))
                                {
                                    sqlWhere.Add($"{field} {relation} '%{val1.Replace("'", "''")}%'");
                                }
                                break;
                        }
                    }
                }

                if (sqlWhere.Count > 0)
                {
                    return string.Join(" and ", sqlWhere);
                }
            }
            return "";
        }

        /// <summary>
        /// 查询
        /// </summary>
        /// <param name="begin">开始时间</param>
        /// <param name="end">结束时间</param>
        /// <param name="page">页码</param>
        /// <param name="rows">页量</param>
        /// <param name="listWhere">条件：键、关系符、值1、值2</param>
        /// <returns></returns>
        public static LoggingResultVM Query(DateTime begin, DateTime end, int page = 1, int rows = 30, List<List<string>> listWhere = null)
        {
            var vm = new LoggingResultVM();

            var sql = GetSqlForQuery(begin, end, out DbHelper db, out int lost, out List<string> listPreSql);
            if (sql != null)
            {
                var whereSql = ListWhereJoin(listWhere);
                if (!string.IsNullOrWhiteSpace(whereSql))
                {
                    whereSql = " where " + whereSql;
                }

                var totalSql = $"select count(1) as Total from ({sql}) as a {whereSql}";
                sql = $"select * from ({sql}) as a {whereSql} order by LogCreateTime desc limit " + rows + " offset " + (page - 1) * rows;

                db.SafeConn(() =>
                {
                    try
                    {
                        db.GetCommand(string.Join(";", listPreSql)).ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                    }

                    vm.RowCount = Convert.ToInt32(db.GetCommand(totalSql).ExecuteScalar());
                    vm.RowData = db.GetCommand(sql).ExecuteDataOnly().First().Value;
                });

                vm.Lost = lost;
            }

            return vm;
        }

        /// <summary>
        /// 查询
        /// </summary>
        /// <param name="queryAllSql"></param>
        /// <param name="queryLimitSql"></param>
        /// <returns></returns>
        public static LoggingResultVM Query(string queryAllSql, string queryLimitSql)
        {
            var vm = new LoggingResultVM();

            var now = DateTime.Now;
            var sql = GetSqlForQuery(now.AddYears(-5), now, out DbHelper db, out int lost, out List<string> listPreSql);
            if (sql != null)
            {
                queryAllSql = queryAllSql.Replace("(TABLE)", "(" + sql + ") as t");
                queryLimitSql = queryLimitSql.Replace("(TABLE)", "(" + sql + ") as t");

                var totalSql = $"select count(1) as Total from ({queryAllSql}) as a";

                db.SafeConn(() =>
                {
                    try
                    {
                        db.GetCommand(string.Join(";", listPreSql)).ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                    }

                    vm.RowCount = Convert.ToInt32(db.GetCommand(totalSql).ExecuteScalar());
                    vm.RowData = db.GetCommand(queryLimitSql).ExecuteDataOnly().First().Value;
                });

                vm.Lost = lost;
            }

            return vm;
        }

        /// <summary>
        /// 统计PV/UV
        /// </summary>
        /// <param name="days">0：今天，-1：昨天，-7：最近7天，-30：最近30天</param>
        /// <param name="listWhere">条件：键、关系符、值1、值2</param>
        /// <returns></returns>
        public static LoggingResultVM StatsPVUV(int days, List<List<string>> listWhere = null)
        {
            var vm = new LoggingResultVM();

            var now = DateTime.Now;
            var begin = now;
            var end = now;

            switch (days)
            {
                //今天
                //昨天
                case 0:
                case -1:
                    {
                        begin = now.AddDays(days).Date;
                        end = DateTime.Parse(now.AddDays(days).ToString("yyyy-MM-dd 23:59:59.999"));
                    }
                    break;
                //最近
                default:
                    {
                        days++;
                        begin = now.AddDays(days).Date;
                    }
                    break;
            }

            var sql = GetSqlForQuery(begin, end, out DbHelper db, out int lost, out List<string> listPreSql);
            vm.Lost = lost;

            if (sql != null)
            {
                var whereSql = ListWhereJoin(listWhere);
                if (!string.IsNullOrWhiteSpace(whereSql))
                {
                    whereSql += " and ";
                }
                sql = $"select LogCreateTime,LogIp from ({sql}) where {whereSql} LogCreateTime>=" + begin.Date.Ticks + " and LogCreateTime<=" + end.Ticks;

                var query = db.SafeConn(() =>
                {
                    try
                    {
                        db.GetCommand(string.Join(";", listPreSql)).ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                    }

                    return db.GetCommand(sql).ExecuteDataOnly().First().Value;
                });

                switch (days)
                {
                    case 0:
                    case -1:
                        {
                            vm.RowData = query.GroupBy(x => new DateTime(Convert.ToInt64(x["LogCreateTime"])).ToString("yyyy-MM-dd HH"))
                                .OrderByDescending(x => x.Key).Select(x => new
                                {
                                    time = x.Key.Split(' ')[1] + ":00",
                                    pv = x.Count(),
                                    uv = x.Select(p => p["LogIp"].ToString().Split(',').First()).Distinct().Count()
                                }).ToList();
                        }
                        break;
                    default:
                        {
                            vm.RowData = query.GroupBy(x => new DateTime(Convert.ToInt64(x["LogCreateTime"])).ToString("yyyy-MM-dd"))
                                .OrderByDescending(x => x.Key).Select(x => new
                                {
                                    time = x.Key,
                                    pv = x.Count(),
                                    uv = x.Select(p => p["LogIp"].ToString().Split(',').First()).Distinct().Count()
                                }).ToList();
                        }
                        break;
                }
            }

            return vm;
        }

        /// <summary>
        /// 统计属性排行
        /// </summary>
        /// <param name="days">0：今天，-1：昨天，-7：最近7天，-30：最近30天</param>
        /// <param name="field">字段列</param>
        /// <param name="listWhere">条件：键、关系符、值1、值2</param>
        /// <returns></returns>
        public static LoggingResultVM StatsTop(int days, string field, List<List<string>> listWhere = null)
        {
            var vm = new LoggingResultVM();

            var now = DateTime.Now;
            var end = now;

            DateTime begin;
            switch (days)
            {
                case 0:
                case -1:
                    {
                        begin = now.AddDays(days).Date;
                        end = DateTime.Parse(now.AddDays(days).ToString("yyyy-MM-dd 23:59:59.999"));
                    }
                    break;
                default:
                    {
                        days++;
                        begin = now.AddDays(days).Date;
                    }
                    break;
            }

            var sql = GetSqlForQuery(begin, end, out DbHelper db, out int lost, out List<string> listPreSql);
            if (sql != null)
            {
                var listName = new LoggingModel().GetType().GetProperties().ToList().Select(x => x.Name).ToList();
                if (listName.Contains(field))
                {
                    var whereSql = ListWhereJoin(listWhere);
                    if (!string.IsNullOrWhiteSpace(whereSql))
                    {
                        whereSql += " and ";
                    }
                    sql = $"select {field} as field,count({field}) as total from ({sql}) where {whereSql} LogCreateTime>={begin.Date.Ticks} and LogCreateTime<={end.Ticks} group by {field} order by total desc";

                    var dt = db.SafeConn(() =>
                    {
                        try
                        {
                            db.GetCommand(string.Join(";", listPreSql)).ExecuteNonQuery();
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex);
                        }

                        return db.GetCommand(sql).ExecuteDataOnly().First().Value;
                    });

                    if (dt.Count > 50)
                    {
                        dt = dt.Take(50).ToList();
                    }
                    vm.Lost = lost;
                    vm.RowData = dt;
                }
            }

            return vm;
        }
    }
}

#endif