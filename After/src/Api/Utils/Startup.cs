using Logic.Customers;
using Logic.Movies;
using Logic.Utils;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

namespace Api.Utils
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddMvc();
            services.AddSwaggerGen(c =>
            {
              c.SwaggerDoc("v1", new Info { Title = "Sports API", Version = "v1" });
            });
            //services.AddSingleton(new SessionFactory(Configuration["ConnectionString"]));
            //services.AddScoped<UnitOfWork>();
            //services.AddTransient<MovieRepository>();
            //services.AddTransient<CustomerRepository>();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionHandler>();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
              c.SwaggerEndpoint("/swagger/v1/swagger.json", "Online Theater API v1");
            });
      DocumentDBRepository<Customer>.Initialize();
    }
    }
}
