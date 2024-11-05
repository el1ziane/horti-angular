import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { Location, NgFor } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { ProdutosService } from '../../../services/produtos.service';
import { Produto } from '../../../model/produto';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@Component({
  selector: 'app-form-produto',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatAutocompleteTrigger, MatAutocomplete, NgFor, MatPrefix, MatSuffix,   MatCardActions, MatButton, CurrencyMaskModule],
  templateUrl: './form-produto.component.html',
  styleUrl: './form-produto.component.scss'
})
export class FormProdutoComponent implements OnInit{

  form!: FormGroup;
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: ProdutosService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private router: ActivatedRoute,
    public formUtils: FormUtilsService
  ) { }

  ngOnInit(): void {
    const produto: Produto = this.router.snapshot.data['produto'];
    this.form = this.formBuilder.group({
      _id: [produto._id],
      codigo: [produto.codigo, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      produtoNome: [produto.produtoNome, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      quantidadeProduto: [produto.quantidadeProduto, [Validators.required]],
      valorProduto: [produto.valorProduto, [Validators.required]],
      peso: [produto.peso, [Validators.required]],
      quantidadePorCaixa: [produto.quantidadePorCaixa, [Validators.required]]
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
    this._snackBar.open("Produto cadastrado com sucesso!", '', { duration: 3000 });
    this.cancelar();
  }

  onSuccessedit(): void {
    this._snackBar.open("Produto editado com sucesso!", '', { duration: 3000 });
    this.cancelar();
  }
  private onError(): void {
    this._snackBar.open("Erro ao salvar produto", '', { duration: 3000 });
  }

  private prepareSave(): any {
    const formValue = { ...this.form.value };
    return formValue;
  }
}
