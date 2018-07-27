import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { MovieResult, Movie, CreateMovieDto } from '../movie-result';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: MovieResult;
  newMovie: CreateMovieDto;
  displayDialog: boolean;

  constructor(private movieServ: MovieService) { }
  
  ngOnInit() {
    this.movieServ.getMovies().subscribe(
      data => {
        this.movies = data;
      }
    );
  }

  addSimple() {
    this.newMovie = new CreateMovieDto();
    this.displayDialog = true;
  }

}
