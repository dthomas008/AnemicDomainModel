import { Dollars } from './Dollars';
import { GenericResult } from '../common/Result';
import { Customer } from './Customer';
import { CustomerName } from './CustomerName';
import { Email } from './Email';
import { Movie, TwoDaysMovie } from '../Movies/Movie';

describe('Customer Test ', () => {
    const cust: Customer = new Customer(CustomerName.Create('Fred').Value, Email.Create('fred@fred.com').Value);
    const movie: Movie = new TwoDaysMovie('Pulp Fiction');
    it('should create new Cusotmer', () => {

       
        expect(cust).toBeTruthy();

    });
    // it('should fail to create invalid amount of cents ', () => {
    //     const dollar: GenericResult<Dollars> = Dollars.Create(1.11111);
    //     expect(dollar.IsFailure).toBe(true);

    // });
    it('should add a purchased movie ', () => {
        
        cust.PurchaseMovie(movie);
        
    });
    it('should have purchased movie ', () => {
        cust.HasPurchasedMovie(movie);
        expect(cust.HasPurchasedMovie(movie)).toBe(true);
    });
});
