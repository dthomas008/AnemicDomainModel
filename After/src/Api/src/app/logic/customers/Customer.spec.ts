import { Dollars } from './Dollars';
import { GenericResult } from '../common/Result';
import { Customer } from './Customer';
import { CustomerName } from './CustomerName';
import { Email } from './Email';
import { Movie, TwoDaysMovie, LifeLongMovie } from '../Movies/Movie';

describe('Customer Test ', () => {
    const cust: Customer = new Customer(CustomerName.Create('Fred').Value, Email.Create('fred@fred.com').Value);
    const movie: Movie = new TwoDaysMovie('Pulp Fiction');
    const movie2: Movie = new LifeLongMovie('Reservoir Dogs');
    it('should create new Cusotmer', () => {
        expect(cust).toBeTruthy();
    });
    // it('should fail to create invalid amount of cents ', () => {
    //     const dollar: GenericResult<Dollars> = Dollars.Create(1.11111);
    //     expect(dollar.IsFailure).toBe(true);

    // });
    it('should purchase a movie ', () => {
        cust.PurchaseMovie(movie);
    });
    it('has not purchased this movie ', () => {
        cust.HasPurchasedMovie(movie2);
    });
    it('should have purchased movie ', () => {
        cust.HasPurchasedMovie(movie);
        expect(cust.HasPurchasedMovie(movie)).toBe(true);
    });
    it('should not purchase an already purchased movie ', () => {
        expect(function () {
            cust.PurchaseMovie(movie);
        }).toThrow(); // for toThrow to work properly you need to wrap in a function
    });

});
