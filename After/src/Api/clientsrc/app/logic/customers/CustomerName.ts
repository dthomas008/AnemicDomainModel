import { GenericResult, Result } from '../common/Result';

export class CustomerName {
    private value: string;
    get Value(): string {
        return this.value;
    }
    private constructor(value: string) {
        this.value = value;
    }
    static  Create(customerName: string): GenericResult<CustomerName> {

        if (customerName.length === 0) {
            return GenericResult.Fail<CustomerName>('Customer name should not be empty');
        }
        if (customerName.length > 100) {
            return GenericResult.Fail<CustomerName>('Customer name is too long');
        }
        return GenericResult.Ok<CustomerName>(new CustomerName(customerName));
    }
}
