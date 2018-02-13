import { AbstractControl, ValidatorFn } from '@angular/forms';
import { GenericResult } from '../logic/common/Result';
import { Email } from '../logic/customers/Email';



export class CommonValidators {
    static email(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: string } | null => {
            const emailResult: GenericResult<Email> = Email.Create(c.value); // re-use the create logic in value objects for validation
            if (emailResult.IsFailure) {
                console.log(emailResult.Error);
                return {email: emailResult.Error};             
            }
            return null;
        };
    }
}
