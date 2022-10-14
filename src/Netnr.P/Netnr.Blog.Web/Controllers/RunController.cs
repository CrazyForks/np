﻿namespace Netnr.Blog.Web.Controllers
{
    /// <summary>
    /// Run
    /// </summary>
    public class RunController : Controller
    {
        public ContextBase db;

        public RunController(ContextBase cb)
        {
            db = cb;
        }

        /// <summary>
        /// Run 首页
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View("/Views/Run/_PartialRunEditor.cshtml");
        }

        /// <summary>
        /// Run 一条
        /// </summary>
        /// <param name="id"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public IActionResult Code([FromRoute] string id, [FromRoute] string sid)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return Redirect("/run/discover");
            }

            //output json
            if (!string.IsNullOrWhiteSpace(id) && id.ToLower().Contains(".json"))
            {
                id = id.Replace(".json", "");
                var mo = db.Run.FirstOrDefault(x => x.RunCode == id && x.RunOpen == 1 && x.RunStatus == 1);
                if (mo != null)
                {
                    return Content(new
                    {
                        code = mo.RunCode,
                        remark = mo.RunRemark,
                        datetime = mo.RunCreateTime,
                        html = mo.RunContent1,
                        javascript = mo.RunContent2,
                        css = mo.RunContent3
                    }.ToJson());
                }
            }

            var userId = IdentityService.Get(HttpContext)?.UserId ?? 0;

            //cmd (Auth)
            switch (sid?.ToLower())
            {
                case "edit":
                    {
                        var mo = db.Run.FirstOrDefault(x => x.RunCode == id);
                        if (mo != null)
                        {
                            return View("/Views/Run/_PartialRunEditor.cshtml", mo);
                        }
                    }
                    break;
                case "delete":
                    {
                        if (HttpContext.User.Identity.IsAuthenticated)
                        {
                            var mo = db.Run.FirstOrDefault(x => x.RunCode == id && x.Uid == userId);
                            db.Run.Remove(mo);
                            int num = db.SaveChanges();
                            if (num > 0)
                            {
                                return Redirect("/run/user/" + userId);
                            }
                            else
                            {
                                return BadRequest();
                            }
                        }
                        else
                        {
                            return Unauthorized("Not Authorized");
                        }
                    }
            }

            //view
            var moout = db.Run.FirstOrDefault(x => x.RunCode == id && x.RunStatus == 1);
            if (moout == null)
            {
                return NotFound();
            }
            else if (moout.RunOpen != 1 && moout.Uid != userId)
            {
                return Unauthorized("Not Authorized");
            }
            else
            {
                var html = moout.RunContent1;
                var totalDays = GlobalTo.StartTime.ToUtcTotalDays();

                var injectJS = $"\n<script src='/js/run/oconsole.js?{totalDays}'></script>\n" +
                    (string.IsNullOrWhiteSpace(moout.RunContent2)
                    ? "" : $"<script>\n{moout.RunContent2}\n</script>\n");

                var injectCSS = string.IsNullOrWhiteSpace(moout.RunContent3)
                    ? "" : $"\n<style>\n{moout.RunContent3}\n</style>\n";

                if (moout.RunContent1.Contains("</head>") && moout.RunContent1.Contains("</body>"))
                {
                    html = html.Replace("</head>", $"{injectCSS}</head>").Replace("</body>", $"{injectJS}</body>");
                }
                else
                {
                    html = $"{html}{injectCSS}{injectJS}";
                }

                return new ContentResult()
                {
                    StatusCode = 200,
                    ContentType = "text/html; charset=utf-8",
                    Content = html
                };
            }
        }

        /// <summary>
        /// Run 保存
        /// </summary>
        /// <param name="mo"></param>
        /// <returns></returns>
        [Authorize, HttpPost]
        public ResultVM Save([FromForm] Run mo)
        {
            var vm = IdentityService.CompleteInfoValid(HttpContext);
            if (vm.Code == 200)
            {
                var uinfo = IdentityService.Get(HttpContext);

                //add
                if (string.IsNullOrWhiteSpace(mo.RunCode))
                {
                    mo.RunId = Guid.NewGuid().ToString();
                    mo.RunCreateTime = DateTime.Now;
                    mo.RunStatus = 1;
                    mo.RunOpen = 1;
                    mo.Uid = uinfo.UserId;

                    mo.RunCode = UniqueTo.LongId().ToString();
                    db.Run.Add(mo);
                    int num = db.SaveChanges();

                    vm.Data = mo.RunCode;
                    vm.Set(num > 0);
                }
                else
                {
                    var oldmo = db.Run.FirstOrDefault(x => x.RunCode == mo.RunCode);
                    if (oldmo?.Uid == uinfo.UserId)
                    {
                        oldmo.RunContent1 = mo.RunContent1;
                        oldmo.RunContent2 = mo.RunContent2;
                        oldmo.RunContent3 = mo.RunContent3;
                        oldmo.RunRemark = mo.RunRemark;
                        oldmo.RunTheme = mo.RunTheme;

                        db.Run.Update(oldmo);
                        int num = db.SaveChanges();

                        vm.Data = mo.RunCode;
                        vm.Set(num > 0);
                    }
                    else
                    {
                        vm.Set(EnumTo.RTag.fail);
                    }
                }

                //推送通知
                _ = PushService.PushAsync("网站消息（Run）", $"{mo.RunRemark}");
            }

            return vm;
        }

        /// <summary>
        /// Run 列表
        /// </summary>
        /// <param name="k"></param>
        /// <param name="page"></param>
        /// <returns></returns>
        [ResponseCache(Duration = 10)]
        public IActionResult Discover(string k, int page = 1)
        {
            var userId = IdentityService.Get(HttpContext)?.UserId ?? 0;

            var ps = CommonService.RunQuery(k, 0, userId, page);
            ps.Route = Request.Path;

            return View("/Views/Run/_PartialRunList.cshtml", ps);
        }

        /// <summary>
        /// Run 用户列表
        /// </summary>
        /// <param name="id"></param>
        /// <param name="k"></param>
        /// <param name="page"></param>
        /// <returns></returns>
        [ActionName("User")]
        public IActionResult Id([FromRoute] string id, string k, int page = 1)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return Redirect("/run/discover");
            }

            int uid = Convert.ToInt32(id);

            var mu = db.UserInfo.Find(uid);
            if (mu == null)
            {
                return Content("Account is empty");
            }
            ViewData["Nickname"] = mu.Nickname;

            var userId = IdentityService.Get(HttpContext)?.UserId ?? 0;

            var ps = CommonService.RunQuery(k, uid, userId, page);
            ps.Route = Request.Path;

            return View("/Views/Run/_PartialRunList.cshtml", ps);
        }
    }
}
