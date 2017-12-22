

    export interface Movie {
        id: number;
        name: string;
        email: string;
        status: string;
        statusExpirationDate?: Date;
        moneySpent: number;
    }

    export interface MovieResult {
        result: Movie[];
        errorMessage?: any;
        timeGenerated: Date;
    }



