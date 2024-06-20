using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

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
BaseTo.ReadyLegacyTimestamp();

//���ϴ��������С����
builder.SetMaxRequestData();

builder.Services.Configure<CookiePolicyOptions>(options =>
{
    //cookie�洢���û�ͬ�⣬ŷ���±�׼�����ҹرգ������û�ûͬ���޷�д��
    options.CheckConsentNeeded = context => false;
    options.MinimumSameSitePolicy = SameSiteMode.None;
});

builder.Services.AddControllersWithViews(options =>
{
    //ע��ȫ�ֹ�����
    options.Filters.Add(new FilterConfigs.GlobalActionAttribute());
}).SetJsonConfig();

//��Ȩ������Ϣ
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
{
    options.Cookie.Name = "netnrf_auth";
    options.LoginPath = "/account/login";
});

//session
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); //��Ч��
    options.Cookie.HttpOnly = true; //����˷���
    options.Cookie.IsEssential = true; //�ƹ�ͬ��ʹ��
});

//���ݿ����ӳ�
builder.Services.AddDbContextPool<ContextBase>(options =>
{
    AppTo.DBT = AppTo.GetValue<DBTypes>("ConnectionStrings:DBTypes");
    DbContextTo.CreateDbContextOptionsBuilder<ContextBase>(AppTo.DBT, options);
}, 10);

//����swagger
builder.Services.AddSwaggerGen(c =>
{
    var name = builder.Environment.ApplicationName;
    c.SwaggerDoc(name, new Microsoft.OpenApi.Models.OpenApiInfo { Title = name, Version = BaseTo.Version });

    c.CustomSchemaIds(type => type.FullName.Replace("+", "."));

    Directory.EnumerateFiles(AppContext.BaseDirectory, "Netnr.*.xml").ForEach(file =>
    {
        c.IncludeXmlComments(file, true);
    });
});

var app = builder.Build();

//ERROR
app.UseExceptionHandler(options => options.SetExceptionHandler());

// Configure the HTTP request pipeline.
if (!(BaseTo.IsDev = app.Environment.IsDevelopment()))
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//����swagger
app.UseSwagger().UseSwaggerUI(c =>
{
    c.DocumentTitle = builder.Environment.ApplicationName;
    c.SwaggerEndpoint($"{c.DocumentTitle}/swagger.json", c.DocumentTitle);
});

//app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseMiddleware<AllowCorsMiddleware>();
// Call UseCors after UseRouting https://learn.microsoft.com/zh-cn/aspnet/core/security/cors
app.UseCors();

//�����֤���� JWT/Cookie ���� HttpContext.User
app.UseAuthentication();
//�����֤����Ȩ����У��
app.UseAuthorization();

// Call UseSession after UseRouting and before MapRazorPages and MapDefaultControllerRoute 
app.UseSession();

//��ȡע�����
using (var scope = app.Services.CreateScope())
{
    //���ݿ��ʼ��
    var db = scope.ServiceProvider.GetRequiredService<ContextBase>();

    //���ݿⲻ�����򴴽��������󷵻�true
    if (db.Database.EnsureCreated())
    {
        var createScript = db.Database.GenerateCreateScript();
        if (AppTo.DBT == DBTypes.PostgreSQL)
        {
            createScript = createScript.Replace(" datetime ", " timestamp ");
        }
        ConsoleTo.WriteCard("GenerateCreateScript", createScript);

        //�������ݿ�
        ConsoleTo.WriteCard("DatabaseReset");
        var vm = await new Netnr.ResponseFramework.Web.Controllers.ServicesController(db).DatabaseReset(deleteData: false, realTimePrint: true);
        Console.WriteLine($"{vm.Code} {vm.Msg}");
    }
}

app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
