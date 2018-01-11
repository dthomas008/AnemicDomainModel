using System;
using Logic.Common;
using Logic.Customers;
using Newtonsoft.Json;

namespace Logic.Movies
{
    public abstract class Movie : Entity
    {
        //protected Movie() // set from DB
        //{
        //    if (this.Id == null)
        //    {
        //        this.Id = Guid.NewGuid().ToString();
        //    }
        //}
        public virtual string Name { get; protected set; }
        public virtual LicensingModel LicensingModel { get; protected set; }

        public abstract ExpirationDate GetExpirationDate();

        public virtual Dollars CalculatePrice(CustomerStatus status)
        {
            decimal modifier = 1 - status.GetDiscount();
            return GetBasePrice() * modifier;
        }

        protected abstract Dollars GetBasePrice();
        public static Movie Create(String name, LicensingModel lmodel) {
            if (name == null || name.Trim() == string.Empty)
                throw new ArgumentException(nameof(name));
            switch (lmodel)
            {
                case LicensingModel.TwoDays:
                    return new TwoDaysMovie(name);
                case LicensingModel.LifeLong:
                    return new LifeLongMovie(name);
                default:
                    throw new ArgumentException(nameof(lmodel));
            }

        }
    }
    
    public class TwoDaysMovie : Movie
    {
        [JsonConstructor]
        public TwoDaysMovie(String name)
        {
            this.Name = name ?? throw new ArgumentException(nameof(name));
            this.LicensingModel = LicensingModel.TwoDays;
        }
        public override ExpirationDate GetExpirationDate()
        {
            return (ExpirationDate)DateTime.UtcNow.AddDays(2);
        }
        protected override Dollars GetBasePrice()
        {
            return Dollars.Of(4);
        }
    }
 
    public class LifeLongMovie : Movie
    {
        [JsonConstructor]
        public LifeLongMovie(String name)
        {
            this.Name = name ?? throw new ArgumentException(nameof(name));
            this.LicensingModel = LicensingModel.LifeLong;
        }
        public override ExpirationDate GetExpirationDate()
        {
            return ExpirationDate.Infinite;
        }
        protected override Dollars GetBasePrice()
        {
            return Dollars.Of(8);
        }
    }
}
