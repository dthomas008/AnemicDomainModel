import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Envelope } from './utils/Envelope';
import { CreateMovieDto, MovieResult, Movie } from './movie-result';

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) { }


  getMovies(): Observable<MovieResult> {
    return this.http.get<MovieResult>('api/movies');
  }
  getMovie(id: string): Observable<Envelope<Movie>> {
    return this.http.get<Envelope<Movie>>('api/movies/' + id);
  }
  createMovie(customer: CreateMovieDto): Observable<MovieResult>  {
     return this.http.post<MovieResult>('api/movies', customer);
  }
  updateMovie(id: string, customer: CreateMovieDto): Observable<MovieResult>  {
     return this.http.put<MovieResult>('api/movies/' + id, customer);

   }
  uniqueEmail(email: string): Observable<MovieResult>  {
    const input = new CreateMovieDto();
     input.email = email;
     return this.http.post<MovieResult>('api/movies/email', input); 
   }
  private handleError(error: any) {
    console.log(error);
    return Observable.throw(error.json());
  }

}
