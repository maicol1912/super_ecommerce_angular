import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module";
import {AuthRoutingModule} from "./auth-routing.module";
import {pages} from "./pages";
import { SignupComponent } from './pages/signup/signup.component';
import { ValidateEmailComponent } from './pages/validate-email/validate-email.component';
import {FocusNextInputDirective} from "./pages/directive/focus-directive";
import {HttpClientModule} from "@angular/common/http";
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { SentChangePasswordComponent } from './pages/sent-change-password/sent-change-password.component';
@NgModule({
  declarations: [
    ...pages,
    SignupComponent,
    ValidateEmailComponent,
    FocusNextInputDirective,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    SentChangePasswordComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    HttpClientModule
  ],
  exports:[
    FocusNextInputDirective
  ]
})
export class AuthModule { }
