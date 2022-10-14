﻿using System;
using System.Threading;
using System.Diagnostics;

namespace Netnr;

/// <summary>雪花算法。分布式Id，业务内必须确保单例</summary>
/// <remarks>
/// 文档 https://newlifex.com/core/snow_flake
/// 
/// 使用一个 64 bit 的 long 型的数字作为全局唯一 id。在分布式系统中的应用十分广泛，且ID 引入了时间戳，基本上保持自增。
/// 1bit保留 + 41bit时间戳 + 10bit机器 + 12bit序列号
/// 
/// 内置自动选择机器workerId，内置无法绝对保证唯一，从而导致整体生成的雪花Id有一定几率重复。
/// 如果想要绝对唯一，建议在外部设置唯一的workerId，再结合单例使用，此时确保最终生成的Id绝对不重复！
/// 高要求场合，推荐使用Redis自增序数作为workerId，在大型分布式系统中亦能保证绝对唯一。
/// </remarks>
public class SnowflakeTo
{
    #region 属性
    /// <summary>开始时间戳。首次使用前设置，否则无效，默认2022-6-6</summary>
    public DateTime StartTimestamp { get; set; } = new DateTime(2022, 6, 6);

    /// <summary>机器Id，取10位。内置不能保证绝对唯一，要求高的场合建议外部保证workerId唯一</summary>
    public int WorkerId { get; set; }

    private int _Sequence;
    /// <summary>序列号，取12位。进程内静态，避免多个实例生成重复Id</summary>
    public int Sequence => _Sequence;

    /// <summary>全局机器Id。若设置，所有雪花实例都将使用该Id，可以由星尘配置中心提供本应用全局唯一机器码，且跨多环境唯一</summary>
    public static int GlobalWorkerId { get; set; }

    private long _msStart;
    private Stopwatch _watch;
    private long _lastTime;
    #endregion

    #region 核心方法
    private void Init()
    {
        if (WorkerId <= 0 && GlobalWorkerId > 0) WorkerId = GlobalWorkerId & 0x3FF;

        // 初始化WorkerId，取5位实例加上5位进程，确保同一台机器的WorkerId不同
        if (WorkerId <= 0)
        {
            var nodeId = Math.Abs(GetHashCode());
            var pid = Process.GetCurrentProcess().Id;
            var tid = Thread.CurrentThread.ManagedThreadId;
            //WorkerId = ((nodeId & 0x1F) << 5) | (pid & 0x1F);
            //WorkerId = (nodeId ^ pid ^ tid) & 0x3FF;
            WorkerId = ((nodeId & 0x1F) << 5) | ((pid ^ tid) & 0x1F);
        }

        // 记录此时距离起点的毫秒数以及开机嘀嗒数
        if (_watch == null)
        {
            _msStart = (long)(DateTime.Now - StartTimestamp).TotalMilliseconds;
            _watch = Stopwatch.StartNew();
        }
    }

    /// <summary>获取下一个Id（长度不固定）</summary>
    /// <returns></returns>
    public virtual long NewId()
    {
        Init();

        // 此时嘀嗒数减去起点嘀嗒数，加上起点毫秒数
        var ms = _watch.ElapsedMilliseconds + _msStart;
        var wid = WorkerId & 0x3FF;
        var seq = Interlocked.Increment(ref _Sequence) & 0x0FFF;

        //!!! 避免时间倒退
        var t = _lastTime - ms;
        if (t > 0)
        {
            // 多线程生成Id的时候，_lastTime在计算差值前被另一个线程更新了，导致时间有微小偏差（一般是1ms）
            //XTrace.WriteLine("Snowflake时间倒退，时间差 {0}ms", t);
            if (t > 10_000) throw new InvalidOperationException($"时间倒退过大({t}ms)，为确保唯一性，Snowflake拒绝生成新Id");

            ms = _lastTime;
        }

        // 相同毫秒内，如果序列号用尽，则可能超过4096，导致生成重复Id
        // 睡眠1毫秒，抢占它的位置 @656092719（广西-风吹面）
        if (ms == _lastTime && seq == 0)
        {
            // spin等1000次耗时141us，10000次耗时397us，100000次耗时3231us。@i9-10900k
            //Thread.SpinWait(1000);
            while (ms <= _lastTime) ms = _watch.ElapsedMilliseconds + _msStart;
        }
        _lastTime = ms;

        /*
         * 每个毫秒内_Sequence没有归零，主要是为了安全，避免被人猜测得到前后Id。
         * 而毫秒内的顺序，重要性不大。
         */

        return (ms << (10 + 12)) | (long)(wid << 12) | (long)seq;
    }

    /// <summary>获取指定时间的Id，带上节点和序列号。可用于根据业务时间构造插入Id</summary>
    /// <param name="time">时间</param>
    /// <returns></returns>
    public virtual long NewId(DateTime time)
    {
        Init();

        var ms = (long)(time - StartTimestamp).TotalMilliseconds;
        var wid = WorkerId & 0x3FF;
        var seq = Interlocked.Increment(ref _Sequence) & 0x0FFF;

        return (ms << (10 + 12)) | (long)(wid << 12) | (long)seq;
    }

    /// <summary>时间转为Id，不带节点和序列号。可用于构建时间片段查询</summary>
    /// <param name="time">时间</param>
    /// <returns></returns>
    public virtual long GetId(DateTime time)
    {
        var t = (long)(time - StartTimestamp).TotalMilliseconds;
        return t << (10 + 12);
    }

    /// <summary>尝试分析</summary>
    /// <param name="id"></param>
    /// <param name="time">时间</param>
    /// <param name="workerId">节点</param>
    /// <param name="sequence">序列号</param>
    /// <returns></returns>
    public virtual bool TryParse(long id, out DateTime time, out int workerId, out int sequence)
    {
        time = StartTimestamp.AddMilliseconds(id >> (10 + 12));
        workerId = (int)((id >> 12) & 0x3FF);
        sequence = (int)(id & 0x0FFF);

        return true;
    }
    #endregion

    #region 实例

    private static SnowflakeTo Snow { get; set; }

    /// <summary>
    /// 实例对象
    /// </summary>
    public static SnowflakeTo SnowInstance
    {
        get
        {
            Snow ??= new SnowflakeTo();
            return Snow;
        }
        set
        {
            Snow = value;
        }
    }

    /// <summary>
    /// 新ID
    /// </summary>
    /// <returns></returns>
    public static long Id() => SnowInstance.NewId();

    #endregion

}