using Logic.Customers;
using Logic.Movies;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using FluentAssertions;
using CSharpFunctionalExtensions;
using System;

namespace Logic.Tests
{
    [TestClass]
    public class UnitTest1
    {
        Customer cust = new Customer(CustomerName.Create("Fred").Value, Email.Create("fred@fred.com").Value);
        Movie movie = new TwoDaysMovie("Pulp Fiction");
        Movie movie2 = new LifeLongMovie("Reservoir Dogs");


        [TestMethod]
        public void should_fail_to_create_invalid_amount_of_cents()
        {
            Result < Dollars > dollar = Dollars.Create(1.11111m);
            dollar.IsFailure.Should().BeTrue();
        }
        [TestMethod]
        public void should_purchase_a_movie()
        {
            cust.PurchaseMovie(movie);
            cust.HasPurchasedMovie(movie).Should().BeTrue();
            cust.PurchasedMovies.Count.Should().Be(1);
        }
        [TestMethod]
        public void should_not_purchased_this_movie()
        {   
            cust.HasPurchasedMovie(movie2).Should().BeFalse();
        }
        //[TestMethod]
        //public void should_not_purchase_an_already_purchased_movie()
        //{
        //    cust.Invoking(cust => cust.PurchaseMovie(movie))
        //        .ShouldNotThrow<Exception>();
        //}
        [TestMethod]
        public void should_promote_a_customer_to_advanced_status_with_enough_purchases()
        {
            cust.PurchaseMovie(movie2);
            cust.PurchaseMovie(movie);
            cust.PurchasedMovies.Count.Should().Be(2);
            //cust.Promote();
            //cust.Status.Should().Be(CustomerStatusType.Advanced);
            

        }


        //it('should promote a customer to advanced status with enough purchases ', () => {
        //        cust.PurchaseMovie(movie2);
        //        cust.Promote();
        //        expect(cust.Status.IsAdvanced).toBe(true); // for toThrow to work properly you need to wrap in a function
        //    });
        //it('should not promote an already promoted customer ', () => {
        //        expect(function() {
        //            cust.Promote();
        //        }).toThrow(); // for toThrow to work properly you need to wrap in a function
        //    });
    }
}
