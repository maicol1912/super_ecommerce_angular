import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module";
import {AuthRoutingModule} from "./auth-routing.module";
import {pages} from "./pages";
@NgModule({
  declarations: [
    ...pages
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
