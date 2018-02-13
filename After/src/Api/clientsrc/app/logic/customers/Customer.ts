import { CustomerName } from './CustomerName';
import { Email } from './Email';
import { Dollars } from './Dollars';
import { CustomerStatus } from './CustomerStatus';
import { PurchasedMovie } from '../Movies/PurchasedMovie';
import { Movie } from '../Movies/Movie';
import { ExpirationDate } from './ExpirationDate';
import { Result } from '../common/Result';

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
    CanPromote(): Result {
        if (this.Status.IsAdvanced) {
            return Result.Fail('The customer already has the Advanced status');
        }
        if (this._purchasedMovies.filter(this.moviePurchasedForStatus).length < 2) {
            return Result.Fail('The customer has to have at least 2 active movies during the last 30 days');
        }
        // if (PurchasedMovies.Where(x => x.PurchaseDate > Date.UtcNow.AddYears(-1)).Sum(x => x.Price) < 100m) {
        //     return Result.Fail('The customer has to have at least 100 dollars spent during the last year');
        // }
        return Result.Ok();
    }
    private moviePurchasedForStatus(movie): boolean {
        const today: Date = new Date();
        const dayOfMonth = today.getDate();
        today.setDate(dayOfMonth - 30); // minus 30 days
        return movie.ExpirationDate === ExpirationDate.Infinite ||
        movie.ExpirationDate.Date >= today;
    }
    Promote(): void {
        if (this.CanPromote().IsFailure) {
            throw new Error();
        }
        this._status = this.Status.Promote();
    }




}
