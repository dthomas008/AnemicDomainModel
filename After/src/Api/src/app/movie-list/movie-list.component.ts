import { Component, OnInit } from '@angular/core';
import { MovieDto } from '../movie-dtos';
import { MovieService } from '../movie.service';
import { Envelope } from '../utils/Envelope';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Envelope<MovieDto[]>;

  constructor(private movieServ: MovieService) { }
  
  ngOnInit() {
    this.movieServ.getMovies().subscribe(
      data => {
        this.movies = data;
      }
    );
  }

}
