import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MovieResult, Movie } from './movie-result';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MovieService {



  constructor(private http: HttpClient) { }


  getMovies(): Observable<MovieResult> {
    return this.http.get<MovieResult>('api/customers');


  }

}
