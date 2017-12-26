import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerResult, Customer, CreateCustomerDto } from './customer-result';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomerService {



  constructor(private http: HttpClient) { }


  getCustomers(): Observable<CustomerResult> {
    return this.http.get<CustomerResult>('api/customers');


  }
  createCustomer(customer: CreateCustomerDto): Observable<CustomerResult>  {
    return this.http.post<CustomerResult>('api/customers', customer);

  }

}
