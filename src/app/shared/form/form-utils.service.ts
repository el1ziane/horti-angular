import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }
  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string){
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormControl){
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
