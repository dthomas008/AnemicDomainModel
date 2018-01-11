using System;
using System.Collections.Generic;
using System.Linq;
using CSharpFunctionalExtensions;
using Logic.Common;
using Logic.Movies;
using Newtonsoft.Json;

namespace Logic.Customers
{
    /*
     This attribute flows down the object graph so use it thoughtfully
     The point here is to avoid [JsonIgnore] on the value objects that 
     have a problem with it during deserialization.
     For those just serialize the private backing field.
     
         
         
         */
   // [JsonObject(MemberSerialization.OptIn)]
    public class Customer : Entity
    {
        [JsonProperty] // use private backing fields for value objects
        private string _name;
        [JsonIgnore] // ignore public writeable properties for value objects
        public virtual CustomerName Name
        {
            get => (CustomerName)_name;
            set => _name = value;
        }
        [JsonProperty] // use private backing fields for value objects
        private  string _email;
        // no need to [JsonIgnore] on read only public fields for value objects
        public virtual Email Email => (Email)_email;
        [JsonProperty]
        public virtual CustomerStatus Status { get; protected set; }
        [JsonProperty]
        private decimal _moneySpent;
        // no need to [JsonIgnore] on protected set fields for value objects
        public virtual Dollars MoneySpent
        {
            get => Dollars.Of(_moneySpent);
            protected set => _moneySpent = value;
        }
        [JsonProperty]
        private  List<PurchasedMovie> _purchasedMovies;
      
        public virtual IReadOnlyList<PurchasedMovie> PurchasedMovies
        
        { get { return _purchasedMovies.AsReadOnly(); }
          
        }
        /* 
       This attribute must be carefully choosen down the whole object
       model (aggregate root) or the objects will not deserialize correctly from CosmosDB
       Note we can keep the constructor private
       Also this constructor only exists for JSON deserialization
       Due to this issue https://github.com/JamesNK/Newtonsoft.Json/pull/1567
       We must use the empty constructor for the root object when we have an 
       object graph with circular dependencies i.e. PurchasedMovie references Customer
       and Customer has a list of PurchasedMovies
       This bug will cause the PurchasedMove reference to Customer to be null
       on deserialization if you use a constructor with argurments
       */
        [JsonConstructor]  
        protected Customer()
        {        
        }

        public Customer(CustomerName name, Email email) : this()
        {
            _name = name ?? throw new ArgumentNullException(nameof(name));
            _email = email ?? throw new ArgumentNullException(nameof(email));

            MoneySpent = Dollars.Of(0);
            Status = CustomerStatus.Regular;
            _purchasedMovies = new List<PurchasedMovie>();
        }
 
        public virtual bool HasPurchasedMovie(Movie movie)
        {
            return PurchasedMovies.Any(x => x.Movie == movie && !x.ExpirationDate.IsExpired);
        }

        public virtual void PurchaseMovie(Movie movie)
        {
            if (HasPurchasedMovie(movie))
                throw new Exception();

            ExpirationDate expirationDate = movie.GetExpirationDate();
            Dollars price = movie.CalculatePrice(Status);

            var purchasedMovie = new PurchasedMovie(movie, this, price, expirationDate);
            _purchasedMovies.Add(purchasedMovie);

            MoneySpent += price;
        }

        public virtual Result CanPromote()
        {
            if (Status.IsAdvanced)
                return Result.Fail("The customer already has the Advanced status");

            if (PurchasedMovies.Count(x =>
                x.ExpirationDate == ExpirationDate.Infinite || x.ExpirationDate.Date >= DateTime.UtcNow.AddDays(-30)) < 2)
                return Result.Fail("The customer has to have at least 2 active movies during the last 30 days");

            if (PurchasedMovies.Where(x => x.PurchaseDate > DateTime.UtcNow.AddYears(-1)).Sum(x => x.Price) < 100m)
                return Result.Fail("The customer has to have at least 100 dollars spent during the last year");

            return Result.Ok();
        }

        public virtual void Promote()
        {
            if (CanPromote().IsFailure)
                throw new Exception();

            Status = Status.Promote();
        }
    }
}
