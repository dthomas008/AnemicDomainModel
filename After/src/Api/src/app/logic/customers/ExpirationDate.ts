import { GenericResult } from '../common/Result';

export class ExpirationDate {

    static readonly Infinite: ExpirationDate = new ExpirationDate(null);
    private _date: Date;
    get IsExpired(): boolean {
        return this !== ExpirationDate.Infinite && this._date < new Date();
    }
    get Date(): Date {
        return this._date;
    }
    private constructor(date: Date) {
        this._date = date;
    }
    static Create(date: Date) {
        return GenericResult.Ok<ExpirationDate>(new ExpirationDate(date));
    }
    static CreateOneYearFromToday() {
        const today = new Date();
        today.setFullYear(today.getFullYear() + 1);
        return GenericResult.Ok<ExpirationDate>(new ExpirationDate(today));
    }
    static CreateDaysFromToday(days: number) {
        const today = new Date();
        today.setHours(today.getHours() + days * 24);
        return GenericResult.Ok<ExpirationDate>(new ExpirationDate(today));
    }

}
