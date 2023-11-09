import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages";
import {SignupComponent} from "./pages/signup/signup.component";
import {ValidateEmailComponent} from "./pages/validate-email/validate-email.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "./pages/change-password/change-password.component";
import {SentChangePasswordComponent} from "./pages/sent-change-password/sent-change-password.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'signup',
    component: SignupComponent
  },
  {
    path:'validate-email',
    component: ValidateEmailComponent
  },
  {
    path:'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path:'change-password',
    component: ChangePasswordComponent
  },
  {
    path:'sent-change-password',
    component: SentChangePasswordComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
