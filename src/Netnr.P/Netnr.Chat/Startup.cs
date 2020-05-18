using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Netnr.Chat
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostEnvironment env)
        {
            GlobalTo.Configuration = configuration;
            GlobalTo.HostEnvironment = env;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                //cookie�洢���û�ͬ�⣬ŷ���±�׼�����ҹرգ������û�ûͬ���޷�д��
                options.CheckConsentNeeded = context => false;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddControllersWithViews()/*.AddRazorRuntimeCompilation()*/;
            //����ʱ����װ�ð����Զ�̬�޸���ͼ cshtml ҳ�棬��������������Ŀ
            //����ʱ������ɾ���ð���������һ�ѡ�������
            //Install-Package Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation

            services.AddControllers().AddNewtonsoftJson(options =>
            {
                //Actionԭ�����JSON
                options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver();
                //���ڸ�ʽ��
                options.SerializerSettings.DateFormatString = "yyyy-MM-dd HH:mm:ss.fff";
            });

            //����swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Netnr API",
                    Version = "v1"
                });

                //JwtBearer
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "������ /account/token �ӿڷ��ص� Token��ǰ��Bearer��ʾ����Bearer x.y.z",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Scheme = "bearer",
                    Type = SecuritySchemeType.Http
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new List<string>()
                    }
                });

                //ע��
                "Chat,Fast".Split(',').ToList().ForEach(x =>
                {
                    c.IncludeXmlComments(AppContext.BaseDirectory + "Netnr." + x + ".xml", true);
                });
            });

            //�����ϴ��ļ���С���ƣ���ϸ��Ϣ��FormOptions��
            services.Configure<FormOptions>(options =>
            {
                options.MultipartBodyLengthLimit = GlobalTo.GetValue<int>("StaticResource:MaxSize") * 1024 * 1024;
            });

            //���ݿ����ӳ�
            services.AddDbContextPool<Data.ContextBase>(options =>
            {
                Data.ContextBase.DCOB(options);
            }, 99);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(GlobalTo.GetValue("TokenManagement:Secret"))),
                    ValidIssuer = GlobalTo.GetValue("TokenManagement:Issuer"),
                    ValidAudience = GlobalTo.GetValue("TokenManagement:Audience"),
                    ClockSkew = TimeSpan.FromSeconds(GlobalTo.GetValue<int>("TokenManagement:AccessExpiration")),
                    ValidateIssuer = true,
                    ValidateAudience = true
                };
            });

            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, Data.ContextBase db, IMemoryCache memoryCache)
        {
            //����
            Core.CacheTo.memoryCache = memoryCache;

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //���ݿⲻ�����򴴽��������󷵻�true
            if (db.Database.EnsureCreated())
            {

            }
            if (db.NChatUser.Count() == 0)
            {
                db.NChatUser.AddRange(new List<Domain.NChatUser>()
                {
                    new Domain.NChatUser()
                    {
                        CuUserId="5098247860344549548",
                        CuCreateTime=DateTime.Now,
                        CuPassword=Core.CalcTo.MD5("netnr"),
                        CuStatus=1,
                        CuUserName="netnr",
                        CuUserNickname="netnr",
                        CuUserPhoto="favicon.ico"
                    },
                    new Domain.NChatUser()
                    {
                        CuUserId="5757526144712703761",
                        CuCreateTime=DateTime.Now,
                        CuPassword=Core.CalcTo.MD5("123"),
                        CuStatus=1,
                        CuUserName="123",
                        CuUserNickname="123",
                        CuUserPhoto="favicon.ico"
                    }
                });
                db.SaveChanges();
            }

            //����swagger
            app.UseSwagger().UseSwaggerUI(c =>
            {
                c.DocumentTitle = "Netnr Chat API";
                c.SwaggerEndpoint("/swagger/v1/swagger.json", c.DocumentTitle);
            });

            app.UseStaticFiles();

            app.UseRouting();

            //��Ȩ����
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCookiePolicy();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

                endpoints.MapHub<Application.ChatHubService>("/chathub");
            });
        }
    }
}
