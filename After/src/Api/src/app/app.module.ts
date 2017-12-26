import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerService } from './customer.service';

import { DataTableModule, SharedModule, ButtonModule, DialogModule } from 'primeng/primeng';
import { CustomerFormComponent } from './customer-form/customer-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: AppComponent },
      { path: 'custList', component: CustomerListComponent },
      { path: 'custList/:id', component: CustomerFormComponent },
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '**', redirectTo: '/', pathMatch: 'full' }
    ]),
    SharedModule,
    DataTableModule,
    ButtonModule,
    DialogModule

  ],
  providers: [CustomerService, HttpClient, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
