import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrdersComponent} from "./orders.component";
import {NavbarComponent} from "../../pages/navbar/navbar.component";
import * as dashboardPages from "../../index"

const routes: Routes = [
  {
    path: '',
    component: dashboardPages.NavbarComponent,
    children: [
      {
        path: 'list',
        component: OrdersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
