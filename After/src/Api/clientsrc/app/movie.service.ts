import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Envelope } from './utils/Envelope';
import { MovieDto } from './movie-dtos';

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) { }


  getMovies(): Observable<Envelope<MovieDto[]>> {
    return this.http.get<Envelope<MovieDto[]>>('api/Movies');
  }
  // getCustomer(id: string): Observable<Envelope<Customer>> {
  //   return this.http.get<Envelope<Customer>>('api/customers/' + id);
  // }
  // createCustomer(customer: CreateCustomerDto): Observable<CustomerResult>  {
  //   return this.http.post<CustomerResult>('api/customers', customer);

  // }
  // updateCustomer(id: string, customer: CreateCustomerDto): Observable<CustomerResult>  {
  //   return this.http.put<CustomerResult>('api/customers/' + id, customer);

  // }
  // uniqueEmail(email: string): Observable<CustomerResult>  {
  //   const input = new CreateCustomerDto();
  //   input.email = email;
  //   return this.http.post<CustomerResult>('api/customers/email', input); 
  // }
  private handleError(error: any) {
    console.log(error);
    return Observable.throw(error.json());
  }

}
