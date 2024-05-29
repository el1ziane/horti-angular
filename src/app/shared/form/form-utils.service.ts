import { Injectable } from "@angular/core";
import { UntypedFormGroup, UntypedFormControl, FormGroup, FormControl } from "@angular/forms";




@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (
        control instanceof UntypedFormGroup
      ) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormFields(control);
      }
    });
  }

  constructor() { }
  getFieldErrorMessage(formGroup: FormGroup, fieldName: string): string{
    const field = formGroup.get(fieldName) as FormControl;
    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormControl): string{
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength']: 3;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength']: 100;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }
    return 'Campo invalido';
  }

}
