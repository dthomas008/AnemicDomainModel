//originally copied from customer-form.component.ts

import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CreateMovieDto, MovieResult, Movie } from '../movie-result';
import { MovieService } from '../movie.service';
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
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  currMovie: CreateMovieDto;
  movieForm: FormGroup;
  message: string;
  private sub: Subscription;
  private formKey = 'MovieForm';


  constructor(private router: Router, private fb: FormBuilder,
    private movServ: MovieService, private wipServ: WipService) {
    this.wipServ.StoreageEvents.subscribe(
      value => { console.log(value); }
    );

  }

  ngOnInit() {

    this.movieForm = this.fb.group({
      name: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      // re-use the create logic in value objects for validation See CommonValidators Class
      genre: ['', [Validators.required,
        Validators.minLength(5),
      Validators.maxLength(20)]]
    });

    const oldForm = this.wipServ.loadWipEntity(this.formKey);
    if (oldForm) {
      this.movieForm.patchValue(oldForm);

    }
  }
  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.movieForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
      this.wipServ.storeWipEntity(this.movieForm.value, this.formKey, 'Movie',
        'Movie form data', this.router.routerState.snapshot.url);
    });
  }

  saveMovie(mov: CreateMovieDto) {
    if (this.movieForm.dirty && this.movieForm.valid) {
      // Copy the form values over the movie object values
      // this is the traditional way to do it.
      // Maybe using the domain objects is what we really want
      const c = Object.assign({}, mov, this.movieForm.value);

      this.movServ.createMovie(c)
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
    } else if (!this.movieForm.dirty) {
      this.onSaveComplete();
    }

  }
  onSaveComplete(): void {
    this.movieForm.reset();
    this.wipServ.removeWipEntity(this.formKey);
  }
  clearFormAndWip(): void {
    this.movieForm.reset();
    this.wipServ.removeWipEntity(this.formKey);
  }
}

