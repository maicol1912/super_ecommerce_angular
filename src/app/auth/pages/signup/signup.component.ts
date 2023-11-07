import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthActions} from "../../../state/actions";
import {SwalService} from "../../../services/swal.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(
    private readonly authService:AuthService,
    private router: Router,
    private store: Store,
    private formBuilder: FormBuilder
  ) {
  }

  public signupForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required,Validators.minLength(10)]],
    email: ['', [Validators.required,Validators.email,Validators.minLength(10)]],
    password: ['', [Validators.required,Validators.minLength(5)]],
    type: ['customer']
  })

  signup(){
    this.signupForm.markAllAsTouched();
    if (this.signupForm.valid) {
      this.store.dispatch(AuthActions.SignupAction({payload:this.signupForm.value}))
    }else{
      SwalService.openErrorAlert("Error en formulario","El formulario no es valido")
    }

  }
}
