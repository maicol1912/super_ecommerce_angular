import {Component, OnInit} from '@angular/core';
import { FocusNextInputDirective } from '../directive/focus-directive';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {selectUserInformation} from "../../../state/reducers";
import {SwalService} from "../../../services/swal.service";
import {AuthActions} from "../../../state/actions";
@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss']
})
export class ValidateEmailComponent implements OnInit{
  correoSent = ''

  constructor(
    private readonly authService:AuthService,
    private router: Router,
    private store: Store,
    private formBuilder: FormBuilder
  ) {
  }

  public validateEmailForm: FormGroup = this.formBuilder.group({
    code1: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(1)]],
    code2: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(1)]],
    code3: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(1)]],
    code4: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(1)]],
    code5: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(1)]],
    code6: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(1)]],
  })

  ngOnInit(): void {
    const emailLogged = this.authService.getEmailLogged()
    if(emailLogged && emailLogged?.length > 8){
      this.correoSent = this.hashEmail(emailLogged)
    }
  }

  validateEmail(){
    this.validateEmailForm.markAllAsTouched();
    if(this.validateEmailForm.valid){
      const otpCode = Object.keys(this.validateEmailForm.controls)
        .map(key => this.validateEmailForm.get(key)?.value)
        .join('');
      this.store.dispatch(AuthActions.VerifyEmailAction({payload:otpCode}))
    }else{
      SwalService.openErrorAlert("Codigo otp invalido","El codigo otp no es valido")
    }
  }

  resendOtpCode(){
    const email = this.authService.getEmailLogged();
    if(!email){
      return null
    }
    return this.store.dispatch(AuthActions.ResendOtpCodeAction({payload:email}))
  }
  hashEmail(email:string){
    const splitEmail = email.split('@');
    const user = splitEmail[0];
    const domain = splitEmail[1];
    const emailHash = '*'.repeat(user.length - 4) + user.slice(-4);
    return emailHash + '@' + domain;
  }
}
