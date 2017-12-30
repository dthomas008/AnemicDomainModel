import { CustomerName } from './CustomerName';
import { Email } from './Email';
import { Dollars } from './Dollars';
import { CustomerStatus } from './CustomerStatus';
import { PurchasedMovie } from '../Movies/PurchasedMovie';
import { Movie } from '../Movies/Movie';
import { ExpirationDate } from './ExpirationDate';

export class Customer {

    private _name: CustomerName;
    private _moneySpent: Dollars;
    private _email: Email;
    private _status: CustomerStatus;
    private _purchasedMovies: Array<PurchasedMovie> = new Array<PurchasedMovie>();

    constructor(name: CustomerName, email: Email) {
        if (!name) {
            throw new Error('Name is null');
        }
        if (!email) {
            throw new Error('Email is null');
        }
        this._email = email;
        this._name = name;
        this._moneySpent = Dollars.Of(0);
        this._status = CustomerStatus.Regular;

    }

    get Name(): CustomerName {
        return this._name;
    }

    get Email(): Email {
        return this._email;
    }
    get MoneySpent(): Dollars {
        return this._moneySpent;
    }
    get Status(): CustomerStatus {
        return this._status;
    }

    HasPurchasedMovie(movie: Movie): boolean {
        const item = this._purchasedMovies.find(x => x.Movie === movie && !x.ExpirationDate.IsExpired);
        return item ? true : false;
    }

    PurchaseMovie(movie: Movie): void {
        if (this.HasPurchasedMovie(movie)) {
            throw new Error();
        }

        const expirationDate: ExpirationDate = movie.GetExpirationDate();
        const price: Dollars = movie.CalculatePrice(this.Status);

        const purchasedMovie: PurchasedMovie = new PurchasedMovie(movie, this, price, expirationDate);
        this._purchasedMovies.push(purchasedMovie);

        this._moneySpent = Dollars.Of(price.Value + this.MoneySpent.Value);

    }





}
