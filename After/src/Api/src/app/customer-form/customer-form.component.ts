import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CreateCustomerDto, CustomerResult, Customer } from '../customer-result';
import { CustomerService } from '../customer.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ValidateUniqueEmail } from '../utils/validateUniqueEmail';
import { Subscription } from 'rxjs/Subscription';
import { Envelope } from '../utils/Envelope';
import { CommonValidators } from '../utils/common.validators';
import { WipService } from '../utils/wip.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';



@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  currCustomer: CreateCustomerDto;
  customerForm: FormGroup;
  message: string;
  private sub: Subscription;
  private formKey = 'CustomerForm';


  constructor(private router: Router, private fb: FormBuilder,
    private custServ: CustomerService, private wipServ: WipService) {
    this.wipServ.StoreageEvents.subscribe(
      value => { console.log(value); }
    );

  }

  ngOnInit() {

    this.customerForm = this.fb.group({
      name: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      // re-use the create logic in value objects for validation See CommonValidators Class
      email: ['', [Validators.required, CommonValidators.email()],
        ValidateUniqueEmail.createValidator(this.custServ)]
    });

    const oldForm = this.wipServ.loadWipEntity(this.formKey);
    if (oldForm) {
      this.customerForm.patchValue(oldForm);

    }
  }
  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.customerForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
      this.wipServ.storeWipEntity(this.customerForm.value, this.formKey, 'Customer',
      'Customer form data', this.router.routerState.snapshot.url);
    });
  }

  saveCustomer(cust: CreateCustomerDto) {
    if (this.customerForm.dirty && this.customerForm.valid) {
      // Copy the form values over the customer object values
      // this is the traditional way to do it.
      // Maybe using the domain objects is what we really want
      const c = Object.assign({}, cust, this.customerForm.value);

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

  }
  onSaveComplete(): void {
    this.customerForm.reset();
    this.wipServ.removeWipEntity(this.formKey);
  }
  clearFormAndWip(): void {
    this.customerForm.reset();
    this.wipServ.removeWipEntity(this.formKey);
  }
}

