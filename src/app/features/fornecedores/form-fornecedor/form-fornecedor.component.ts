import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { Location, NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FornecedoresService } from '../../../services/fornecedores.service';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { Fornecedor } from '../../../model/fornecedor';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-form-fornecedor',
  templateUrl: './form-fornecedor.component.html',
  styleUrls: ['./form-fornecedor.component.scss'],
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatAutocompleteTrigger, MatAutocomplete, NgFor, MatPrefix, MatSuffix, MatDatepickerInput, MatDatepickerToggle, MatDatepicker, MatCardActions, MatButton, NgxMaskDirective],
  providers: [provideNgxMask()],
})
export class FormFornecedorComponent implements OnInit {

  form!: FormGroup;

  constructor( private formBuilder: NonNullableFormBuilder,
    private service: FornecedoresService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private router: ActivatedRoute,
    public formUtils: FormUtilsService) { }

  ngOnInit(): void {
    const fornecedor: Fornecedor = this.router.snapshot.data['fornecedor'];
    this.form = this.formBuilder.group({
      _id: [fornecedor._id],
      fornecedorNome: [fornecedor.fornecedorNome, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      cnpj: [fornecedor.cnpj, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      telefone: [fornecedor.telefone, [Validators.minLength(10), Validators.maxLength(15)]],
      email: [fornecedor.email, [Validators.maxLength(100)]],
    });
  }
  enviar(): void {
    if (this.form.valid) {
      const formValue = this.prepareSave();
      if (formValue._id) {
        this.service.editar(formValue).subscribe(
          result => this.onSuccessedit(),
          error => this.onError()
        );
      } else {
        this.service.salvar(formValue).subscribe(
          result => this.onSuccess(),
          error => this.onError()
        );
      }
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  cancelar(): void {
    this.location.back();
  }

  onSuccess(): void {
    this._snackBar.open("Fornecedor cadastrado com sucesso!", '', { duration: 3000 });
    this.cancelar();
  }

  onSuccessedit(): void {
    this._snackBar.open("Fornecedor editado com sucesso!", '', { duration: 3000 });
    this.cancelar();
  }
  private onError(): void {
    this._snackBar.open("Erro ao salvar fornecedor", '', { duration: 3000 });
  }

  private prepareSave(): any {
    const formValue = { ...this.form.value };
    return formValue;
  }

}
