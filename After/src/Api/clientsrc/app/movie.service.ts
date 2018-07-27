import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MovieResult, Movie, CreateMovieDto } from './movie-result';
import { Observable } from 'rxjs/Observable';
import { Envelope } from './utils/Envelope';

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) { }


  getMovies(): Observable<MovieResult> {
    return this.http.get<MovieResult>('api/movies');
  }
  getMovie(id: string): Observable<Envelope<Movie>> {
    return this.http.get<Envelope<Movie>>('api/movies/' + id);
  }
  createMovie(movie: CreateMovieDto): Observable<MovieResult>  {
    return this.http.post<MovieResult>('api/movies', movie);
  }
  updateMovie(id: string, movie: CreateMovieDto): Observable<MovieResult>  {
    return this.http.put<MovieResult>('api/movies/' + id, movie);
  }
  private handleError(error: any) {
    console.log(error);
    return Observable.throw(error.json());
  }

}
