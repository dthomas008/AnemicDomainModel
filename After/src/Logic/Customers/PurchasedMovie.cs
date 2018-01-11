using System;
using Logic.Common;
using Logic.Movies;
using Newtonsoft.Json;

namespace Logic.Customers
{
 
    public class PurchasedMovie : Entity
    {
        [JsonProperty]
        public virtual Movie Movie { get; protected set; }
        //[JsonProperty(IsReference = true, PropertyName = "_customer", TypeNameHandling =TypeNameHandling.All)]
        [JsonProperty]
        private Customer _customer;
        //[JsonIgnore]
        public virtual Customer Customer { get {
                return this._customer;
            } }
        [JsonProperty]
        private decimal _price;
        public virtual Dollars Price
        {
            get => Dollars.Of(_price);
            protected set => _price = value;
        }
        [JsonProperty]
        public virtual DateTime PurchaseDate { get; protected set; }
        [JsonProperty]
        private DateTime? _expirationDate;
        public virtual ExpirationDate ExpirationDate
        {
            get => (ExpirationDate)_expirationDate;
            protected set => _expirationDate = value;
        }
        [JsonConstructor]
        protected PurchasedMovie()
        {
        }
       // [JsonConstructor]// used for deserialization
        internal PurchasedMovie(Movie movie, Customer customer, Dollars price, ExpirationDate expirationDate)
        {
            if (price == null || price.IsZero)
                throw new ArgumentException(nameof(price));
            if (expirationDate == null || expirationDate.IsExpired)
                throw new ArgumentException(nameof(expirationDate));

            Movie = movie ?? throw new ArgumentNullException(nameof(movie));
            this._customer = customer ?? throw new ArgumentNullException(nameof(customer));
            Price = price;
            ExpirationDate = expirationDate;
            PurchaseDate = DateTime.UtcNow;
        }
        //[JsonConstructor]// used for deserialization
        //private PurchasedMovie(Movie movie, Dollars price, ExpirationDate expirationDate)
        //{
        //    if (price == null || price.IsZero)
        //        throw new ArgumentException(nameof(price));
        //    if (expirationDate == null || expirationDate.IsExpired)
        //        throw new ArgumentException(nameof(expirationDate));

        //    Movie = movie ?? throw new ArgumentNullException(nameof(movie));
        //    // JSON.net only provides a null customer here not sure why
        //    //Customer = customer ?? throw new ArgumentNullException(nameof(customer));
        //    Price = price;
        //    ExpirationDate = expirationDate;
        //    PurchaseDate = DateTime.UtcNow;
        //}
    }
}
