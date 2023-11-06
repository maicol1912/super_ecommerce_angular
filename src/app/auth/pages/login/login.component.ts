import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {PageResources} from "../../../helpers/page-resources";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SwalService} from "../../../services/swal.service";
import {Store} from "@ngrx/store";
import {AuthActions} from "../../../state/actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private readonly authService:AuthService,
    private router: Router,
    private store: Store,
    private formBuilder: FormBuilder
  ) {
  }

  public authForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required,Validators.email,Validators.minLength(10)]],
    password: ['', [Validators.required,Validators.minLength(5)]],
  })

  login(){
    this.authForm.markAllAsTouched();
    if (this.authForm.valid) {
        this.store.dispatch(AuthActions.LoginAction({payload:this.authForm.value}))
    }else{
      SwalService.openErrorAlert("Error en formulario","El formulario no es valido")
    }

  }
}
