import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthActions} from "../../../state/actions";
import {SwalService} from "../../../services/swal.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  constructor(
    private readonly authService:AuthService,
    private router: Router,
    private store: Store,
    private formBuilder: FormBuilder
  ) {
  }

  public changePasswordForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required,Validators.email,Validators.minLength(10)]],
    oldPassword: ['', [Validators.required,Validators.minLength(5)]],
    newPassword: ['', [Validators.required,Validators.minLength(5)]],
  })

  changePassword(){
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.valid) {
      if(this.changePasswordForm.get('password')?.value === this.changePasswordForm.get('checkPassword')?.value){
        SwalService.openErrorAlert("Error en formulario","Las contrasenas no coinciden")
      }
      this.store.dispatch(AuthActions.ChangePasswordAction({payload:this.changePasswordForm.value}))
    }else{
      SwalService.openErrorAlert("Error en formulario","El formulario no es valido")
    }
  }
}
