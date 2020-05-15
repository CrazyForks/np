using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Netnr.ResponseFramework.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        //dotnet Netnr.ResponseFramework.dll "http://*:51"

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    //����Kestrel�����ļ�
                    webBuilder.ConfigureKestrel((context, options) =>
                    {
                        options.Limits.MaxRequestBodySize = GlobalTo.GetValue<int>("StaticResource:MaxSize") * 1024 * 1024;
                    });

                    webBuilder.UseStartup<Startup>();

                    if (args.Length > 0)
                    {
                        webBuilder.UseUrls(args[0]);
                    }
                });
    }
}
