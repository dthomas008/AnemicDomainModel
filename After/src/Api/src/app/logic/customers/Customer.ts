import { CustomerName } from './CustomerName';
import { Email } from './Email';
import { Dollars } from './Dollars';
import { CustomerStatus } from './CustomerStatus';
import { PurchasedMovie } from '../Movies/PurchasedMovie';

export class Customer {

    private _name: CustomerName;
    private  _moneySpent: Dollars;
    private _email: Email;
    private _status: CustomerStatus;
    private readonly _purchasedMovies: Array<PurchasedMovie>;

    constructor (name: CustomerName, email: Email ) {
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






}
