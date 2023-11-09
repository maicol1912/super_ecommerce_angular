import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthActions} from "../../../state/actions";
import {SwalService} from "../../../services/swal.service";
import {CryptoLibrary} from "../../../helpers/crypto.library";
import {PageResources} from "../../../helpers/page-resources";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  private tokenHashed:string | null = null
  constructor(
    private readonly authService:AuthService,
    private router: Router,
    private store: Store,
    private formBuilder: FormBuilder,
    private readonly route: ActivatedRoute
  ) {
  }
  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      this.tokenHashed = fragment
      this.validateTokenAllow(fragment)
    });
  }

  public changePasswordForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required,Validators.email,Validators.minLength(10)]],
    oldPassword: ['', [Validators.required,Validators.minLength(5)]],
    newPassword: ['', [Validators.required,Validators.minLength(5)]],
  })

  changePassword(){
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.valid) {

      SwalService.openErrorAlert("Error en formulario","Las contrasenas no coinciden")

      this.store.dispatch(AuthActions.ChangePasswordAction({payload:{...this.changePasswordForm.value, token:this.tokenHashed}}))
    }else{
      SwalService.openErrorAlert("Error en formulario","El formulario no es valido")
    }
  }

  validateTokenAllow(token:string | null){
    try{
      if(!token){
        this.router.navigate([PageResources.login])
        return false
      }
      const tokenNotHashed = CryptoLibrary.decrypt(token)
      if(!tokenNotHashed){
        this.router.navigate([PageResources.login])
        return false
      }
      return true
    }catch (error){
      this.router.navigate([PageResources.login])
      return false;
    }

  }
}
