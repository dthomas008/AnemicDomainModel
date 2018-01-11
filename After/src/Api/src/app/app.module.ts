import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerService } from './customer.service';

import { DataTableModule, SharedModule, ButtonModule, DialogModule, PanelModule, MenuModule } from 'primeng/primeng';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieService } from './movie.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerFormComponent,
    CustomerEditComponent,
    MovieListComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: AppComponent },
      { path: 'custList', component: CustomerListComponent },
      { path: 'movieList', component: MovieListComponent },
      { path: 'custAdd', component: CustomerFormComponent },
      { path: 'custList/:id', component: CustomerEditComponent },
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '**', redirectTo: '/', pathMatch: 'full' }
    ]),
    SharedModule,
    DataTableModule,
    ButtonModule,
    DialogModule,
    PanelModule,
    MenuModule

  ],
  providers: [MovieService, CustomerService, HttpClient, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
