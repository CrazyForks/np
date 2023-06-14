using Netnr;

var builder = WebApplication.CreateBuilder(args);

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
        Description = "<b>GitHub</b>��<a target='_blank' href='https://github.com/netnr'>https://github.com/netnr</a> ����ԱĬ�����룺<b>nr</b>"
    });

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
    c.InjectStylesheet("/Home/SwaggerCustomStyle");
});

//��ʼ����
using var db = new SQLite.SQLiteConnection(Netnr.FileServer.Application.FileServerService.SQLiteConn);
db.CreateTable<Netnr.FileServer.Domain.SysApp>();
db.CreateTable<Netnr.FileServer.Domain.FileRecord>();

//��̬��Դ
app.UseStaticFiles(new StaticFileOptions()
{
    ServeUnknownFileTypes = true,
    OnPrepareResponse = (resp) =>
    {
        resp.Context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
        resp.Context.Response.Headers.Add("Cache-Control", "public, max-age=604800");
    }
});

//Ŀ¼���&&��������
if (builder.Configuration.GetValue<bool>("Safe:EnableDirectoryBrowsing") && builder.Configuration.GetValue<bool>("Safe:PublicAccess"))
{
    string vrootdir = builder.Configuration.GetValue<string>("StaticResource:RootDir");
    string prootdir = Netnr.FileServer.Application.FileServerService.StaticVrPathAsPhysicalPath(vrootdir);
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
    fso.StaticFileOptions.OnPrepareResponse = (resp) =>
    {
        resp.Context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
        resp.Context.Response.Headers.Add("Cache-Control", "public, max-age=604800");
    };
    fso.FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(prootdir);
    //Ŀ¼�������
    fso.RequestPath = new PathString(vrootdir);
    app.UseFileServer(fso);
}

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();