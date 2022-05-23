using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Netnr;
using Netnr.SharedApp;

var builder = WebApplication.CreateBuilder(args).SetGlobal();

//���ϴ��������С����
var srms = builder.Configuration.GetValue<int>("StaticResource:MaxSize");
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = srms * 1024 * 1024;
});
builder.Services.Configure<Microsoft.AspNetCore.Http.Features.FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = srms * 1024 * 1024;
});

builder.Services.Configure<CookiePolicyOptions>(options =>
{
    //cookie�洢���û�ͬ�⣬ŷ���±�׼�����ҹرգ������û�ûͬ���޷�д��
    options.CheckConsentNeeded = context => false;
    options.MinimumSameSitePolicy = SameSiteMode.None;
});

builder.Services.AddControllersWithViews(options =>
{
    //ע��ȫ�ֹ�����
    options.Filters.Add(new Netnr.ResponseFramework.Web.Apps.FilterConfigs.GlobalActionAttribute());
}).SetJson();
builder.Services.AddSwaggerGenNewtonsoftSupport();

//��Ȩ������Ϣ
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
{
    options.Cookie.Name = "__NRF_AUTH";
    options.LoginPath = "/account/login";
});

//session
builder.Services.AddSession();

//���ݿ����ӳ�
builder.Services.AddDbContextPool<Netnr.ResponseFramework.Data.ContextBase>(options =>
{
    Netnr.ResponseFramework.Data.ContextBaseFactory.CreateDbContextOptionsBuilder(options);
}, 10);

//��ʱ����
FluentScheduler.JobManager.Initialize(new Netnr.ResponseFramework.Web.Apps.TaskService.Reg());

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
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//���ݿ��ʼ��
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<Netnr.ResponseFramework.Data.ContextBase>();

    var createScript = db.Database.GenerateCreateScript();
    if (Netnr.SharedFast.GlobalTo.TDB == SharedEnum.TypeDB.PostgreSQL)
    {
        createScript = createScript.Replace(" datetime ", " timestamp ");
    }
    Console.WriteLine(createScript);

    //���ݿⲻ�����򴴽��������󷵻�true
    if (db.Database.EnsureCreated())
    {
        //�������ݿ�
        var vm = new Netnr.ResponseFramework.Web.Controllers.ServicesController().DatabaseReset();
        Console.WriteLine(vm.ToJson(true));
    }
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

app.UseSession();

app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
