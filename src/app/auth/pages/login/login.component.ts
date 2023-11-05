import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {PageResources} from "../../../helpers/page-resources";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SwalService} from "../../../services/swal.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private readonly authService:AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  public authForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required]],
  })

  login(){
    this.authForm.markAllAsTouched();
    if (this.authForm.valid) {
      this.authService.login(this.authForm.value).subscribe((response)=>{
        if(response){
          this.router.navigate([PageResources.listProducts]);
          return
        }
      })
    }else{
      SwalService.openErrorAlert("Error en formulario","El formulario no es valido")
    }

  }
}
