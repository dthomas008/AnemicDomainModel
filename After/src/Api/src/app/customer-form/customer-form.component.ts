import { Component, OnInit } from '@angular/core';
import { CreateCustomerDto } from '../customer-result';
import { CustomerService } from '../customer.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';



@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  newCustomer: CreateCustomerDto;
  customerForm: FormGroup;
  message: String;


  constructor(private fb: FormBuilder, private custServ: CustomerService) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]]
    });

  }
  saveCustomer(cust: CreateCustomerDto) {
    if (this.customerForm.dirty && this.customerForm.valid) {
      // Copy the form values over the product object values
      let c = Object.assign({}, cust, this.customerForm.value);

      this.custServ.createCustomer(c)
        .subscribe(
        (data) => {
          console.log(data);
          this.message = 'Save complete.';
          this.onSaveComplete();
        },
        (error: any) => {
          console.log(error);
          this.message = error.error.errorMessage;
          this.onSaveComplete();
        }
        );
    } else if (!this.customerForm.dirty) {
      this.onSaveComplete();
    }
    // console.log(cust.name);
    // console.log(cust.email);
    // this.custServ.createCustomer(cust).subscribe(
    //   data => {
    //     
    //     this.onSaveComplete();
    //   },
    //   error => {
    //     console.log(error);
    //   });
  }
  onSaveComplete(): void {

    
    // Reset the form to clear the flags
    this.customerForm.reset();
    

    // this.router.navigate(['/products']);
  }

}
