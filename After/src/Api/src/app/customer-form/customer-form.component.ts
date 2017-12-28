import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateCustomerDto, CustomerResult, Customer } from '../customer-result';
import { CustomerService } from '../customer.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ValidateUniqueEmail } from '../utils/validateUniqueEmail';
import { Subscription } from 'rxjs/Subscription';
import { Envelope } from '../utils/Envelope';



@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  currCustomer: CreateCustomerDto;
  customerForm: FormGroup;
  message: string;
  private sub: Subscription;


  constructor(private router: Router, private fb: FormBuilder, private custServ: CustomerService) {

  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')], ValidateUniqueEmail.createValidator(this.custServ)]
    });


  }

  saveCustomer(cust: CreateCustomerDto) {
    if (this.customerForm.dirty && this.customerForm.valid) {
      // Copy the form values over the customer object values
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
          this.message = 'Error saving.';
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
    this.customerForm.reset();
  }
}

