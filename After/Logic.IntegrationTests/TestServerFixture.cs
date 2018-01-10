using Api.Utils;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;

namespace Logic.IntegrationTests
{
    class TestServerFixture
    {
        private string[] args;

        public TestServer Server { get; private set; }
        public HttpClient Client { get; private set; }

        public TestServerFixture()
        {
            //var builder = new WebHostBuilder()
            //    //.UseContentRoot(Path.Combine(Directory.GetCurrentDirectory(), @"..\..\..\..\CloudShaper"))
            //    .UseEnvironment("Test")
            //    //.UseApplicationInsights()
            //    .UseStartup(typeof(Startup));
            var builder = WebHost.CreateDefaultBuilder(args)
                .UseContentRoot(Path.Combine(Directory.GetCurrentDirectory(), @"..\..\..\..\src\API"))
                .UseEnvironment("Test")
                .UseStartup<Startup>();
                

            Server = new TestServer(builder);

            Client = Server.CreateClient();
        }
    }
}
