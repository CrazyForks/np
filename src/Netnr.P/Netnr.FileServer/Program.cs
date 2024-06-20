PMScriptTo.Init();

var builder = WebApplication.CreateBuilder(args);
if (!BaseTo.CommandLineArgs.Contains("--urls"))
{
    builder.WebHost.ConfigureKestrel((context, serverOptions) =>
    {
        //����˿�
        serverOptions.Listen(System.Net.IPAddress.Any, 0);
    });
}

BaseTo.ReadyEncoding();

//���ϴ��������С����
builder.SetMaxRequestData();

// Add services to the container.
builder.Services.AddControllersWithViews().SetJsonConfig();

//����swagger
builder.Services.AddSwaggerGen(c =>
{
    var name = builder.Environment.ApplicationName;

    c.SwaggerDoc(name, new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = name,
        Version = BaseTo.Version,
        Description = "<b>GitHub</b>��<a target='_blank' href='https://github.com/netnr'>https://github.com/netnr</a>"
    });

    c.CustomSchemaIds(type => type.FullName.Replace("+", "."));

    Directory.EnumerateFiles(AppContext.BaseDirectory, "Netnr.*.xml").ForEach(file =>
    {
        c.IncludeXmlComments(file, true);
    });
});

var app = builder.Build();
//ȫ�ִ�����
app.UseExceptionHandler(options =>
{
    options.Run(async context =>
    {
        context.Response.StatusCode = 200;

        var vm = new ResultVM();
        vm.Set(RCodeTypes.exception);

        var ex = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>();
        if (ex != null)
        {
            ConsoleTo.LogError(ex.Error, "Server-Error");
            vm.Msg = ex.Error.Message;
            vm.Data = ex.Error.ToTree();
        }

        context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
        context.Response.Headers.Append("Access-Control-Allow-Methods", context.Request.Method);
        context.Response.Headers.Append("Access-Control-Allow-Headers", "*");
        await context.Response.WriteAsync(vm.ToJson(true));
    });
});

//����swagger
app.UseSwagger(c =>
{
    c.PreSerializeFilters.Add((swagger, httpReq) =>
    {
        var listAction = ProjectTo.GetAllAction();
        var listDomainMember = ProjectTo.GetDocumentationFile("Netnr.FileServer");
        var listDomainType = typeof(HomeController).Assembly.GetTypes();

        //����ע��
        swagger.Paths.ForEach(path =>
        {
            path.Value.Operations.ForEach(httpMethod =>
            {
                if (httpMethod.Value.RequestBody != null)
                {
                    if (string.IsNullOrWhiteSpace(httpMethod.Value.RequestBody?.Description))
                    {
                        //��������
                        var methodModel = listAction.FirstOrDefault(x => path.Key.EndsWith($"{x.ControllerName}/{x.ActionName}"));
                        if (methodModel != null)
                        {
                            //Content-Type �ֵ�
                            httpMethod.Value.RequestBody.Content.ForEach(contentType =>
                            {
                                //Properties �ֵ�
                                contentType.Value.Schema.Properties.ForEach(propItem =>
                                {
                                    //��������
                                    var parameterModel = methodModel.ActionParameter.FirstOrDefault(x => x.ParameterName == propItem.Key);
                                    if (parameterModel == null)
                                    {
                                        // ������ʵ��
                                        foreach (var ap in methodModel.ActionParameter)
                                        {
                                            var domainType = listDomainType.FirstOrDefault(x => x.FullName == ap.ParameterFullType);
                                            if (domainType != null)
                                            {
                                                //����ע��
                                                var prop = domainType.GetProperty(propItem.Key);
                                                var propMember = listDomainMember.FirstOrDefault(x => x.Attributes["name"].Value == $"P:{ap.ParameterFullType}.{propItem.Key}");
                                                if (propMember != null)
                                                {
                                                    propItem.Value.Description = propMember.InnerText.Trim();
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    else if (!string.IsNullOrWhiteSpace(parameterModel.ParameterComment))
                                    {
                                        // ��������
                                        propItem.Value.Description = parameterModel.ParameterComment;
                                    }
                                });
                            });
                        }
                    }
                }
            });
        });
    });
}).UseSwaggerUI(c =>
{
    c.DocumentTitle = builder.Environment.ApplicationName;
    c.SwaggerEndpoint($"{c.DocumentTitle}/swagger.json", c.DocumentTitle);
});

//��ʼ����
AppService.CollSysApp.EnsureIndex(x => x.AppId, true);
AppService.CollSysApp.EnsureIndex(x => x.AppKey, true);
AppService.CollSysApp.EnsureIndex(x => x.AppOwner, true);
AppService.CollSysApp.EnsureIndex(x => x.AppToken, true);
AppService.CollFileRecord.EnsureIndex(x => x.Id, true);
AppService.CollFileRecord.EnsureIndex(x => x.OwnerUser);

//������ʱ�ϴ�
if (AppTo.GetValue<bool>("Safe:EnableUploadTmp"))
{
    //����������ʱĿ¼�߳�
    var thread = new Thread(() =>
    {
        while (true)
        {
            AppService.ClearTmp(AppTo.GetValue<int>("StaticResource:TmpExpire"));
            Thread.Sleep(1000 * 60);
        }
    })
    {
        IsBackground = true
    };
    thread.Start();
    GC.KeepAlive(thread);
}

//��̬��Դ
app.UseStaticFiles(new StaticFileOptions()
{
    ServeUnknownFileTypes = true,
    OnPrepareResponse = (resp) =>
    {
        resp.Context.Response.Headers.AccessControlAllowOrigin = "*";

        var maxAge = AppTo.GetValue<int>("StaticResource:TmpExpire");
        maxAge = maxAge == 0 ? 604800 : maxAge * 60;
        resp.Context.Response.Headers.CacheControl = $"public, max-age={maxAge}";
    }
});

//Ŀ¼���&&��������
if (builder.Configuration.GetValue<bool>("Safe:EnableDirectoryBrowsing") && builder.Configuration.GetValue<bool>("Safe:PublicAccess"))
{
    string vrootdir = builder.Configuration.GetValue<string>("StaticResource:RootDir");
    string prootdir = AppService.StaticVrPathAsPhysicalPath(vrootdir);
    if (!Directory.Exists(prootdir))
    {
        Directory.CreateDirectory(prootdir);
    }

    var fso = new FileServerOptions()
    {
        EnableDirectoryBrowsing = true,
        EnableDefaultFiles = false
    };
    fso.StaticFileOptions.ServeUnknownFileTypes = true;
    fso.FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(prootdir);
    //Ŀ¼�������
    fso.RequestPath = new PathString(vrootdir);
    app.UseFileServer(fso);
}

app.UseRouting();

//���� CORS
var corsDomain = AppTo.GetValue<string>("Safe:AllowCrossDomain");
if (!string.IsNullOrWhiteSpace(corsDomain))
{
    app.UseMiddleware<AllowCorsMiddleware>(new AllowCorsMiddleware.MiddlewareOptions { CustomOrigin = corsDomain });
    app.UseCors();
}

app.UseAuthorization();

app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();