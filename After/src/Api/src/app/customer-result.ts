

    export interface Customer {
        id: string;
        name: string;
        email: string;
        status: string;
        statusExpirationDate?: Date;
        moneySpent: number;
    }

    export interface CustomerResult {
        result: Customer[];
        errorMessage?: any;
        timeGenerated: Date;
    }

    export class CreateCustomerDto {
        public name: string;
        public email: string;
    }

