import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { MovieResult, Movie } from '../movie-result';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: MovieResult;
  constructor(private movieServ: MovieService) { }

  ngOnInit() {
    this.movieServ.getMovies().subscribe(
      data => {
            this.movies = data;
           }

      
    );
  }

}
