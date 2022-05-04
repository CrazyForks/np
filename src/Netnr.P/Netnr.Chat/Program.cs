using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

Netnr.SharedFast.GlobalTo.Configuration = builder.Configuration;
Netnr.SharedFast.GlobalTo.HostEnvironment = builder.Environment;

Netnr.SharedReady.ReadyTo.EncodingReg();

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
    options.CheckConsentNeeded = context => false;
    options.MinimumSameSitePolicy = SameSiteMode.None;
});

// Add services to the container.
builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
{
    //Actionԭ�����JSON
    options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver();
    //���ڸ�ʽ��
    options.SerializerSettings.DateFormatString = "yyyy-MM-dd HH:mm:ss.fff";
});

//��Ȩ������Ϣ
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();

//session
builder.Services.AddSession();

builder.Services.AddSignalR();

//���ݿ����ӳ�
builder.Services.AddDbContextPool<Netnr.Chat.Data.ContextBase>(options =>
{
    Netnr.Chat.Data.ContextBaseFactory.CreateDbContextOptionsBuilder(options);
}, 10);
//���ݿ��ʼ��
builder.Services.Configure<Netnr.Chat.Data.ContextBase>(db =>
{
    //���ݿⲻ�����򴴽��������󷵻�true
    if (db.Database.EnsureCreated())
    {

    }

    if (!db.NChatUser.Any())
    {
        db.NChatUser.Add(new Netnr.Chat.Domain.NChatUser()
        {
            CuUserId = "5757526144712703761",
            CuCreateTime = DateTime.Now,
            CuPassword = Netnr.Core.CalcTo.MD5("123"),
            CuStatus = 1,
            CuUserName = "123",
            CuUserNickname = "123",
            CuUserPhoto = "favicon.ico"

        });
        db.NChatUser.Add(new Netnr.Chat.Domain.NChatUser()
        {
            CuUserId = "5757526144712703761",
            CuCreateTime = DateTime.Now,
            CuPassword = Netnr.Core.CalcTo.MD5("123"),
            CuStatus = 1,
            CuUserName = "123",
            CuUserNickname = "123",
            CuUserPhoto = "favicon.ico"
        });

        db.SaveChanges();
    }
});

//����swagger
builder.Services.AddSwaggerGen(c =>
{
    var name = builder.Environment.ApplicationName;
    c.SwaggerDoc(name, new Microsoft.OpenApi.Models.OpenApiInfo { Title = name });
    c.IncludeXmlComments($"{AppContext.BaseDirectory}{name}.xml", true);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
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

app.UseStaticFiles();

app.UseRouting();

//��Ȩ
app.UseAuthentication();
app.UseAuthorization();

app.UseSession();

app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapHub<Netnr.Chat.Application.ChatHubService>("/chathub");

app.Run();