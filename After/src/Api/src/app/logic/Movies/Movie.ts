import { Entity } from '../common/Entity';
import { LicensingModel } from '../customers/LicensingModel';
import { ExpirationDate } from '../customers/ExpirationDate';
import { CustomerStatus } from '../customers/CustomerStatus';
import { Dollars } from '../customers/Dollars';
export class Movie extends Entity {
    public Name: string;
    protected LicensingModel: LicensingModel;
    public GetExpirationDate(): ExpirationDate { throw new Error('not implemented'); }
    public CalculatePrice(status: CustomerStatus): Dollars {
        const modifier: number = 1 - status.GetDiscount;
        return Dollars.Of(this.GetBasePrice().Value * modifier);
    }
    protected GetBasePrice(): Dollars { throw new Error('not implemented'); }
}
