import { AbstractControl } from '@angular/forms';
import { CustomerService } from '../customer.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';


export class ValidateUniqueEmail {
    static createValidator(custService: CustomerService) {
        return (control: AbstractControl) => {
            return custService.uniqueEmail(control.value).debounceTime(800).map(res => {
                console.log(res);
                return null; // null means validation is successful
            }).catch(ret => {
                console.log(ret);
                return [{ emailTaken: ret.error.errorMessage }]; // must return an array of errors when validation fails 
            });
        };
    }
}
