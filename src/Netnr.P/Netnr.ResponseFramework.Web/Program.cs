using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Netnr;

var builder = WebApplication.CreateBuilder(args);

ReadyTo.EncodingReg();
ReadyTo.LegacyTimestamp();

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
    AppTo.TDB = AppTo.GetValue<EnumTo.TypeDB>("TypeDB");
    DbContextTo.CreateDbContextOptionsBuilder<ContextBase>(AppTo.TDB, options);
}, 10);

//����swagger
builder.Services.AddSwaggerGen(c =>
{
    var name = builder.Environment.ApplicationName;
    c.SwaggerDoc(name, new Microsoft.OpenApi.Models.OpenApiInfo { Title = name });

    c.IncludeXmlComments($"{AppContext.BaseDirectory}{name}.xml", true);
});

var app = builder.Build();

//ERROR
app.UseExceptionHandler(options => options.SetExceptionHandler());

// Configure the HTTP request pipeline.
if (!(GlobalTo.IsDev = app.Environment.IsDevelopment()))
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//��ȡע�����
using (var scope = app.Services.CreateScope())
{
    //���ݿ��ʼ��
    var db = scope.ServiceProvider.GetRequiredService<ContextBase>();

    //���ݿⲻ�����򴴽��������󷵻�true
    if (db.Database.EnsureCreated())
    {
        var createScript = db.Database.GenerateCreateScript();
        if (AppTo.TDB == EnumTo.TypeDB.PostgreSQL)
        {
            createScript = createScript.Replace(" datetime ", " timestamp ");
        }
        Console.WriteLine(createScript);

        //�������ݿ�
        var vm = new Netnr.ResponseFramework.Web.Controllers.ServicesController().DatabaseReset();
        Console.WriteLine(vm.ToJson(true));
    }


    //��ʱ���� https://github.com/fluentscheduler/FluentScheduler
    FluentScheduler.JobManager.Initialize();
    var sc = new Netnr.ResponseFramework.Web.Controllers.ServicesController();

    //ÿ2����2:2 �������ݿ�
    FluentScheduler.JobManager.AddJob(() =>
    {
        var vm = sc.DatabaseReset();
        Console.WriteLine(vm.ToJson(true));
        ConsoleTo.Log(vm.ToJson());
    }, s =>
    {
        s.WithName("Job_DatabaseReset");
        s.ToRunEvery(2).Days().At(2, 2);
    });

    //ÿ2����3:3 ������ʱĿ¼
    FluentScheduler.JobManager.AddJob(() =>
    {
        var vm = sc.ClearTmp();
        Console.WriteLine(vm.ToJson(true));
        ConsoleTo.Log(vm.ToJson());
    }, s => s.ToRunEvery(2).Days().At(3, 3));
}

//����swagger
app.UseSwagger().UseSwaggerUI(c =>
{
    c.DocumentTitle = builder.Environment.ApplicationName;
    c.SwaggerEndpoint($"{c.DocumentTitle}/swagger.json", c.DocumentTitle);
    c.InjectStylesheet("/Home/SwaggerCustomStyle");
});

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

//�����֤���� JWT/Cookie ���� HttpContext.User
app.UseAuthentication();
//�����֤����Ȩ����У��
app.UseAuthorization();

// Call UseSession after UseRouting and before MapRazorPages and MapDefaultControllerRoute 
app.UseSession();

app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
