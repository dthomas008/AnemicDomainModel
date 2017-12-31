import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/primeng';
import {Menu} from 'primeng/components/menu/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  private menuItems: MenuItem[];


  ngOnInit(): void {
    this.menuItems = [
      {label: 'Home', icon: 'fa-home', routerLink: ['/'] },
      {label: 'Add Customer', icon: 'fa-tasks', routerLink: ['/custAdd'] },
      {label: 'List Customers', icon: 'fa-users', routerLink: ['/custList'] }
    ];
  }
}
