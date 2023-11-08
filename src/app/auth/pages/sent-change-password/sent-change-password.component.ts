import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthActions} from "../../../state/actions";
import {SwalService} from "../../../services/swal.service";

@Component({
  selector: 'app-sent-change-password',
  templateUrl: './sent-change-password.component.html',
  styleUrls: ['./sent-change-password.component.scss']
})
export class SentChangePasswordComponent {

  constructor(
    private readonly authService:AuthService,
    private router: Router,
    private store: Store,
    private formBuilder: FormBuilder
  ) {
  }

  public sentChangePasswordForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required,Validators.email,Validators.minLength(10)]],
  })

  sentChangePassword(){
    this.sentChangePasswordForm.markAllAsTouched();
    if (this.sentChangePasswordForm.valid) {
      this.store.dispatch(AuthActions.SendLinkChangePasswordAction({payload:this.sentChangePasswordForm.value}))
    }else{
      SwalService.openErrorAlert("Error en formulario","El formulario no es valido")
    }
  }
}
