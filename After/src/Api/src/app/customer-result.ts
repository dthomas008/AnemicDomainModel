

    export interface Customer {
        id: number;
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



