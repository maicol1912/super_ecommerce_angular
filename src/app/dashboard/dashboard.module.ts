import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {pages} from "./index";
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [
    ...pages
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ],
  exports:[
    CommonModule,
    MaterialModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
