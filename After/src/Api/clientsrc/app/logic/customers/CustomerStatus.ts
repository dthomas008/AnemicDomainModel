import { ExpirationDate } from './ExpirationDate';


export enum CustomerStatusType {
    Regular = 1,
    Advanced = 2
}


export class CustomerStatus {

    static readonly Regular: CustomerStatus = new CustomerStatus(CustomerStatusType.Regular, ExpirationDate.Infinite);

    private _type: CustomerStatusType;
    private _date: ExpirationDate;

    get Type(): CustomerStatusType {
        return this._type;
    }
    get IsAdvanced(): boolean {
        return this._type === CustomerStatusType.Advanced && !this._date.IsExpired;
    }
    get GetDiscount(): number {
        return  this.IsAdvanced ? 0.25 : 0;
    }
    Promote(): CustomerStatus {
        return new CustomerStatus(CustomerStatusType.Advanced, ExpirationDate.CreateOneYearFromToday().Value);
    }

    private constructor(type: CustomerStatusType, expirationDate: ExpirationDate) {
        this._type = type;
        if (expirationDate === null) {
            throw new Error('Null expiration date.');
        }
        this._date = expirationDate;
    }

    

}
