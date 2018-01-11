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

        Email fred = Email.Create("fred@fred.com").Value;
        private async Task<Customer> getCustomerForTest() {
            return await DocumentDBRepository<Customer>.GetCustomerByEmail(fred);
        }


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
        public async Task Create_New_TwoDaysMovie()
        {
            Movie movie = new TwoDaysMovie("Pulp Fiction");
            await DocumentDBRepository<Movie>.CreateItemAsync(movie);
            
        }
        [TestMethod]
        public async Task Create_New_LifeLongMovie()
        {
            Movie movie = new LifeLongMovie("Reservoir Dogs");
            await DocumentDBRepository<Movie>.CreateItemAsync(movie);
            
        }
        [TestMethod]
        public async Task Get_LifeLongMovie()
        {
            Movie movie = await DocumentDBRepository<Movie>.GetMovieByNameAsync("Reservoir Dogs");         
        }
        [TestMethod]
        public async Task Get_Customer_by_email()
        {         
            Customer cust = await DocumentDBRepository<Customer>.GetCustomerByEmail(fred);
            cust.Email.Should().Be(fred);
        }
        [TestMethod]
        public async Task Customer_Buys_two_movies_and_saves_to_DB()
        {
            Customer cust = await getCustomerForTest();
            Movie movie = new TwoDaysMovie("Pulp Fiction");
            Movie movie2 = new LifeLongMovie("Reservoir Dogs");
            cust.PurchaseMovie(movie2);
            cust.PurchaseMovie(movie);
            await DocumentDBRepository<Customer>.UpdateItemAsync(cust.Id ,cust);
        }
        

        [TestMethod]
        public async Task Customer_Has_bought_Two_Movies()
        {       
           Customer cust = await getCustomerForTest();
           cust.PurchasedMovies.Count.Should().Be(2);
        }
        [TestMethod]
        public async Task Delete_Customer() // test delete and clean up DB
        {
            Customer cust = await getCustomerForTest();
            await DocumentDBRepository<Customer>.DeleteItemAsync(cust.Id);
        }


        [TestMethod]
        public void Deserialize_With_Circular_reference()
        {
            JsonSerializerSettings jsonSettings = DocumentDBRepository<Customer>.jsonSettings;

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
