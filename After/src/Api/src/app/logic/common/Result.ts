class ResultCommonLogic {

    private _isFailure: boolean;
    private readonly _error: string;

    constructor(isFailure: boolean, error: string) {
        console.log(isFailure);
        console.log(error);
        console.log((error !== null));
        if (isFailure) {
            if (error === null ) {
                throw new Error('There must be error message for failure.');
            }

        } else {
            if (error !== null ) {
                throw new Error('There should be no error message for success.');
            }
        }
        this._isFailure = isFailure;
        this._error = error;
    }
    get IsFailure(): boolean {
        return this._isFailure;

    }
    get IsSuccess(): boolean {
        return !this._isFailure;
    }
    get Error(): string {
        if (this.IsSuccess) {
            throw new Error('There is no error message for success.');
        }
        return this._error;
    }
}
export class GenericResult<T> {
    private readonly _value: T;
    private readonly _logic: ResultCommonLogic;
    constructor(isFailure: boolean, value: T, error: string) {
        if (!isFailure && value === null) {
            throw new Error('Success must contain a value.');
        }
        this._logic = new ResultCommonLogic(isFailure, error);
        this._value = value;
    }
    get Value(): T {
        if (this._logic.IsFailure) {
            throw new Error('There is no value for failure.');
        }
        return this._value;
    }
    static Ok<T>(value: T): GenericResult<T> {
        return new GenericResult<T>(false, value, null);
    }
    static Fail<T>(error: string): GenericResult<T> {
        return new GenericResult<T>(true, null, error);
    }
    get IsFailure(): boolean {
        return this._logic.IsFailure;
    }
    get IsSuccess(): boolean {
        return this._logic.IsSuccess;
    }
    get Error(): string {
        return this._logic.Error;
    }
}

export class Result {

    private static readonly OkResult: Result = new Result(false, null);
    private readonly _logic: ResultCommonLogic;


    private constructor(isFailure: boolean, error: string) {

        this._logic = new ResultCommonLogic(isFailure, error);
    }

    get IsFailure(): boolean {
        return this._logic.IsFailure;
    }
    get IsSuccess(): boolean {
        return this._logic.IsSuccess;
    }
    get Error(): string {
        return this._logic.Error;
    }
    static Ok(): Result {
        return Result.OkResult;
    }
    static Fail(error: string): Result {
        return new Result(true, error);
    }


}




