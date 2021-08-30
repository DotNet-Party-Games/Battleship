using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using BattleshipBL;
using BattleshipDL;
using Microsoft.EntityFrameworkCore;

namespace BattleshipWebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "BattleshipWebAPI", Version = "v1" });
            });

            // adding connection to db 
            services.AddDbContext<BattleshipDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Reference2DB")));

            // adding scopes
            services.AddScoped<IStatisticBL, StatisticBL>();
            services.AddScoped<IStatisticDL, StatisticDL>();

            //Configuring CORS in our web api to accept the local address in our Angular project
            services.AddCors(
                (builder) => {
                    builder.AddDefaultPolicy((policy) =>
                    {
                        policy.WithOrigins("http://localhost:4200", "http://127.0.0.1:4200", "https://battleship-tsw-ui.azurewebsites.net/", "https://battleship-tsw.azurewebsites.net/") //This is where you state the address that you want to trust
                            .AllowAnyHeader() //Allows any header
                            .AllowAnyMethod(); //Allows any http verb method
                    });
                }
            );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BattleshipWebAPI v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(builder =>
                builder.WithOrigins("http://localhost:4200", "http://127.0.0.1:4200", "https://battleship-tsw-ui.azurewebsites.net/", "https://battleship-tsw.azurewebsites.net/")
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
