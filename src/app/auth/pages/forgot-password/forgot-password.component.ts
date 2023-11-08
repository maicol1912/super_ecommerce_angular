import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthActions} from "../../../state/actions";
import {SwalService} from "../../../services/swal.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  constructor(
    private readonly authService:AuthService,
    private router: Router,
    private store: Store,
    private formBuilder: FormBuilder
  ) {
  }

  public forgotPasswordForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required,Validators.email,Validators.minLength(10)]],
  })

  forgotPassword(){
    this.forgotPasswordForm.markAllAsTouched();
    if (this.forgotPasswordForm.valid) {
      this.store.dispatch(AuthActions.ForgotPasswordAction({payload:this.forgotPasswordForm.value}))
    }else{
      SwalService.openErrorAlert("Error en formulario","El formulario no es valido")
    }

  }
}
