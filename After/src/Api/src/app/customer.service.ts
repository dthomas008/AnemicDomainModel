import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerResult, Customer, CreateCustomerDto } from './customer-result';
import { Observable } from 'rxjs/Observable';
import { Envelope } from './utils/Envelope';

@Injectable()
export class CustomerService {



  constructor(private http: HttpClient) { }


  getCustomers(): Observable<CustomerResult> {
    return this.http.get<CustomerResult>('api/customers');
  }
  getCustomer(id: string): Observable<Envelope<Customer>> {
    return this.http.get<Envelope<Customer>>('api/customers/' + id);
  }
  createCustomer(customer: CreateCustomerDto): Observable<CustomerResult>  {
    return this.http.post<CustomerResult>('api/customers', customer);

  }
  updateCustomer(id: string, customer: CreateCustomerDto): Observable<CustomerResult>  {
    return this.http.put<CustomerResult>('api/customers/' + id, customer);

  }
  uniqueEmail(email: string): Observable<CustomerResult>  {
    const input = new CreateCustomerDto();
    input.email = email;
    return this.http.post<CustomerResult>('api/customers/email', input); 
  }
  private handleError(error: any) {
    console.log(error);
    return Observable.throw(error.json());
  }

}
