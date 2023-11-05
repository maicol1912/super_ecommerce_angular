import { Injectable } from '@angular/core'
import Swal, { SweetAlertIcon } from 'sweetalert2';

enum SWAL_ICON_TYPES {
  success  = 'success',
  error    = 'error',
  warning  = 'warning',
  info     = 'info',
  question = 'question'
}

@Injectable({
  providedIn: 'root'
})

export class SwalService {

  static openInfoAlert(title: string, message: string) {
    this.openBasicAlert(title, message, SWAL_ICON_TYPES.info)
  }

  static openErrorAlert(title: string, message: string) {
    this.openBasicAlert(title, message, SWAL_ICON_TYPES.error)
  }

  static openBasicAlert(title: string, message: string, icon: SweetAlertIcon = "info") {
    Swal.fire(title, message, icon)
  }


}
