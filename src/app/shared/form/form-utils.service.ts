import { Injectable } from "@angular/core";
import { UntypedFormGroup, UntypedFormControl, FormGroup, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validarCNPJ(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cnpj = control.value;
    if (!cnpj) return null;

    // Limpeza do CNPJ (remoção de caracteres não numéricos)
    const cnpjLimpo = cnpj.replace(/[^\d]+/g, '');

    // Validação de comprimento
    if (cnpjLimpo.length !== 14) return { cnpjInvalido: true };

    // Verificação de sequência de caracteres repetidos
    if (/^(\d)\1*$/.test(cnpjLimpo)) return { cnpjInvalido: true };

    // Cálculo dos dígitos verificadores do CNPJ
    const calcDigito = (tamanho: number) => {
      let soma = 0, pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += +cnpjLimpo[tamanho - i] * pos--;
        if (pos < 2) pos = 9;
      }
      const resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      return resultado;
    };

    if (calcDigito(12) !== +cnpjLimpo[12] || calcDigito(13) !== +cnpjLimpo[13]) {
      return { cnpjInvalido: true };
    }

    return null; // CNPJ válido
  };
}
@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {


  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getFieldErrorMessage(formGroup: FormGroup, fieldName: string): string {
    const field = formGroup.get(fieldName) as FormControl;
    if (fieldName === 'cnpj') {
      if (field?.hasError('required')) {
        return 'CNPJ é obrigatório';
      }
      if (field?.hasError('minlength') || field?.hasError('maxlength')) {
        return 'O CNPJ deve ter exatamente 14 dígitos';
      }
      if (field?.hasError('cnpjInvalido')) {
        return 'CNPJ inválido';
      }
    } else {
      return this.getErrorMessageFromField(field);
    }
    return '';

  }

  getErrorMessageFromField(field: UntypedFormControl): string {
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 8;
      return `A senha deve ter no mínimo ${requiredLength} caracteres.`;
    }
    if (field?.hasError('email')) {
      return 'Formato de email inválido';
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }
    if (field?.hasError('cnpjInvalido')) {
      return 'CNPJ inválido';
    }
    return 'Campo inválido';
  }



}

