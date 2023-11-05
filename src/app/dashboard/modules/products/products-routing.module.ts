import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as dashboardPages from "../../index";
import {ProductsComponent} from "./products.component";

const routes: Routes = [
  {
    path: '',
    component: dashboardPages.NavbarComponent,
    children: [
      {
        path: '',
        component: ProductsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
