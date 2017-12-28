import { GenericResult } from '../common/Result';

export class Email {
    private value: string;
    get Value(): string {
        return this.value;
    }
    private constructor(value: string) {
        this.value = value;
    }
    static  Create(email: string): GenericResult<Email> {

        if (email.length === 0) {
            return GenericResult.Fail<Email>('Email should not be empty');
        }
        const emailCheck: RegExp = new RegExp('^(.+)@(.+)$');
        if (!emailCheck.test(email)) {
            return GenericResult.Fail<Email>('Customer name is too long');
        }
        return GenericResult.Ok<Email>(new Email(email));
    }
}
