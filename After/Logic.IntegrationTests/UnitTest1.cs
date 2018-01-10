using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;

namespace Logic.IntegrationTests
{
    [TestClass]
    public class UnitTest1
    {
        TestServerFixture ts = new TestServerFixture();
        [TestMethod]
        public void TestMethod1()
        {
        }
        [TestMethod]
        public async Task Gets_The_Home_Page()
        {
            var result2 = await ts.Client.GetAsync("/");
            Assert.AreEqual(result2.StatusCode, System.Net.HttpStatusCode.OK);
        }
    }
}
