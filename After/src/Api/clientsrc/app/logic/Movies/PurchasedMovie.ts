import { Entity } from '../common/Entity';
import { Movie } from './Movie';
import { Customer } from '../customers/Customer';
import { Dollars } from '../customers/Dollars';
import { Data } from '@angular/router/src/config';
import { ExpirationDate } from '../customers/ExpirationDate';

export class PurchasedMovie extends Entity {
    private _movie: Movie;
    private _customer: Customer;
    private _price: Dollars;
    private _expirationDate: ExpirationDate;
    private _purchaseDate: Date;

    constructor (movie: Movie, customer: Customer, price: Dollars, expDate: ExpirationDate) {
        super();
        if (price === null || price.IsZero) {
            throw new Error('Bad price');
        }
        if (expDate === null || expDate.IsExpired) {
            throw new Error('Bad exiration date');
        }
        if (!movie) {
            throw new Error('Null movie');
        }
        if (!customer) {
            throw new Error('Null customer');
        }
        this._price = price;
        this._expirationDate = expDate;
        this._movie = movie;
        this._customer = customer;
        this._purchaseDate = new Date();
    }
    get  Movie(): Movie {
        return this._movie;
    }
    get  Customer(): Customer {
        return this._customer;
    }
    get PurchaseDate(): Data {
        return this._purchaseDate;
    }
    get Price(): Dollars {
        return this._price;
    }
    get ExpirationDate(): ExpirationDate {
        return this._expirationDate;
    }

   
  
}
