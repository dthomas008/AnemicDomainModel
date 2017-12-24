import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { CustomerResult, Customer } from '../customer-result';



@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: CustomerResult;
  constructor(private customerServ: CustomerService) { }

  ngOnInit() {
    this.customerServ.getCustomers().subscribe(
      data => {
            this.customers = data;
           }

      
    );
  }

}
