import { CustomerName } from './CustomerName';
import { Email } from './Email';
import { Dollars } from './Dollars';

export class Customer {


    private _name: CustomerName;
    private  _moneySpent: Dollars;
    get Name(): CustomerName {
        return this._name;
    }
    private _email: Email;
    get Email(): Email {
        return this._email;
    }
    get MoneySpent(): Dollars {
        return this._moneySpent;
    }






}
