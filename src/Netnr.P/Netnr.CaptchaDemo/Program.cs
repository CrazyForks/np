using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Netnr.CaptchaDemo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        //dotnet Netnr.CaptchaDemo.dll "https://*:59"

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();

                    if (args.Length > 0)
                    {
                        webBuilder.UseUrls(args[0]);
                    }
                });
    }
}
