import { AbstractControl } from '@angular/forms';


export function validateSizeFile(control: AbstractControl): any {
    if (control.value && control.value.files && control.value.files[0].size > 10000000) {
        return { file_size: true };
    }
    return null;
}

export function validateFileType(control: AbstractControl): any {
  const typesAvalaibles = ['image/png', 'image/jpeg', 'image/bmp', 'image/gif', 'application/pdf', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '.doc','.docx','application/msword'];
  if (control.value && control.value.files && !typesAvalaibles.includes(control.value.files[0].type) ) {
    return { file_type: true };
  }
  return null;
}

export function validateFileTypeOnlyImages(control: AbstractControl): any {
  const typesAvalaibles = ['image/png', 'image/jpeg', 'image/bmp', 'image/gif'];
  if (control.value && control.value.files && !typesAvalaibles.includes(control.value.files[0].type) ) {
    return { file_type: true };
  }
  return null;
}

export const readFile = (file: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});
