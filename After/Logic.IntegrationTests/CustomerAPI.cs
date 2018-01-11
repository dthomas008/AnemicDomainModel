using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;
using FluentAssertions;
using System.Net;
using Logic.Utils;
using Logic.Customers;
using Logic.Movies;
using System.IO;
using Newtonsoft.Json;

namespace Logic.IntegrationTests
{
    [TestClass]
    public class CustomerAPI
    {
        string rogerId = "24bed2a7-a266-4c7a-a446-7996807d30a6";// "3ac98d16-d023-4153-87fb-7702131807a7";
        string wilmaId = "d78d16c5-f265-43e9-af7f-32aed5fa73ad";
        JsonSerializerSettings jsonSettings = new JsonSerializerSettings
        {
            PreserveReferencesHandling = PreserveReferencesHandling.All,
            TypeNameHandling = Newtonsoft.Json.TypeNameHandling.Auto,
            //ReferenceLoopHandling = ReferenceLoopHandling.Serialize
            


        };
        TestServerFixture ts = new TestServerFixture();
        [TestMethod]
        public async Task Gets_The_Home_Page()
        {
            var response = await ts.Client.GetAsync("/");
            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }
        [TestMethod]
        public async Task Gets_Customers()
        {
            var response = await ts.Client.GetAsync("/api/customers");
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            
        }
        [TestMethod]
        public async Task Create_New_Customer()
        {
            Customer cust = new Customer(CustomerName.Create("Fred").Value, 
                Email.Create("fred@fred.com").Value);
            await DocumentDBRepository<Customer>.CreateItemAsync(cust);
        }
        [TestMethod]
        public async Task Get_Customer_by_email()
        {
            Email fred = Email.Create("fred@fred.com").Value;
            Customer cust = await DocumentDBRepository<Customer>.GetCustomerByEmail(fred);
            cust.Email.Should().Be(fred);
        }
        [TestMethod]
        public async Task Create_New_Customer_and_Buy_two_movies()
        {
            Customer cust = new Customer(CustomerName.Create("Tester").Value,
                Email.Create("fred@fred.com").Value);
            Movie movie = new TwoDaysMovie("Pulp Fiction");
            Movie movie2 = new LifeLongMovie("Reservoir Dogs");
            cust.PurchaseMovie(movie2);
            cust.PurchaseMovie(movie);
            await DocumentDBRepository<Customer>.CreateItemAsync(cust);
        }
        
        public async Task should_save_a_customer_with_movies_to_the_DB()
        {
            
            Customer cust = await DocumentDBRepository<Customer>.GetItemAsync(rogerId);
            Movie movie = new TwoDaysMovie("Pulp Fiction");
            Movie movie2 = new LifeLongMovie("Reservoir Dogs");
            cust.PurchaseMovie(movie2);
            cust.PurchaseMovie(movie);
            cust.PurchasedMovies.Count.Should().Be(2);
            await DocumentDBRepository<Customer>.UpdateItemAsync(rogerId, cust);

        }
        [TestMethod]
        public async Task Customer_Has_bought_Two_Movies()
        {
            
           Customer cust = await DocumentDBRepository<Customer>.GetItemAsync(rogerId);
           cust.PurchasedMovies.Count.Should().Be(2);

        }

        //[TestMethod]
        //public async Task Deserialize_With_Circular_reference()
        //{
 
        //    string source = await File.ReadAllTextAsync(Path.Combine(Directory.GetCurrentDirectory(), @"..\..\..\Customer.json"));
        //    // C: \Users\cyber\source\repos\AnemicDomainModel\After\Logic.IntegrationTests\Customer.json

        //    Customer cust = JsonConvert.DeserializeObject<Customer>(source,jsonSettings);
        //    //cust.PurchasedMovies.Count.Should().Be(2);

        //}
        [TestMethod]
        public void Deserialize_With_Circular_reference()
        {
            
            Customer cust = new Customer(CustomerName.Create("Fred").Value,
                Email.Create("fred@fred.com").Value);
            Movie movie = new TwoDaysMovie("Pulp Fiction");
            Movie movie2 = new LifeLongMovie("Reservoir Dogs");
            cust.PurchaseMovie(movie2);
            cust.PurchaseMovie(movie);
            string output = JsonConvert.SerializeObject(cust, jsonSettings);

            Customer result = JsonConvert.DeserializeObject<Customer>(output, jsonSettings);
            result.PurchasedMovies[0].Customer.Should().NotBeNull();
            result.PurchasedMovies[0].Movie.Should().NotBeNull();
            result.PurchasedMovies.Count.Should().Be(2);
            result.MoneySpent.Value.Should().Be(12);
            result.Name.Value.Should().Be("Fred");
            result.Email.Value.Should().Be("fred@fred.com");
            result.Status.IsAdvanced.Should().BeFalse();

        }
    }

}
