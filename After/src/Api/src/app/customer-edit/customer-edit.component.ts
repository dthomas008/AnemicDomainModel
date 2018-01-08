import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { CreateCustomerDto, Customer } from '../customer-result';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Envelope } from '../utils/Envelope';
import { ValidateUniqueEmail } from '../utils/validateUniqueEmail';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  currCustomer: Customer;
  customerForm: FormGroup;
  private sub: Subscription;
  private message: string;

  constructor(private route: ActivatedRoute, private custServ: CustomerService, private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')], ValidateUniqueEmail.createValidator(this.custServ)]
    });
    // Read the cust Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        const id = params['id'];
        this.getCustomer(id);
      }
    );

  }

  getCustomer(id: string): void {
    this.custServ.getCustomer(id)
      .subscribe(
      (customer: Envelope<Customer>) => this.onCustomerRetrieved(customer),
      (error: Envelope<Customer>) => this.message = error.errorMessage
      );
  }
  onCustomerRetrieved(customer: Envelope<Customer>) {
    if (this.customerForm) {
      this.customerForm.reset();
    }
    this.currCustomer = customer.result;

    // Update the data on the form
    this.customerForm.patchValue({
      name: this.currCustomer.name,
      email: this.currCustomer.email
    });

  }
}
