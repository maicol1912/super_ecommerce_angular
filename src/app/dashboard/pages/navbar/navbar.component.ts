import { Component } from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {FormBuilder} from "@angular/forms";
import {AuthActions} from "../../../state/actions";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
      private readonly authService:AuthService,
      private router: Router,
      private store: Store,
      private formBuilder: FormBuilder
  ) {
  }
  logout(){
    this.store.dispatch(AuthActions.LogoutAction())
  }
}
