import { Location, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatDateFormats, MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Recebimento } from '../../../model/recebimento';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { MatButton } from '@angular/material/button';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { RecebimentosService } from '../../../services/recebimentos.service';
import { Produto } from '../../../model/produto';
import { ProdutosService } from '../../../services/produtos.service';
import moment from 'moment';

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'input',
  },
  display: {
    dateInput: 'dd-MM-yyyy',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

@Component({
    selector: 'app-form-recebimento',
    templateUrl: './form-recebimento.component.html',
    styleUrls: ['./form-recebimento.component.scss'],
    providers: [
      provideNativeDateAdapter(),
      {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    ],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatAutocompleteTrigger, MatAutocomplete, NgFor, MatPrefix, MatSuffix, MatDatepickerInput, MatDatepickerToggle, MatDatepicker, MatCardActions, MatButton, ]
})
export class FormRecebimentoComponent implements OnInit {

  produtos: Produto[] = [];
  filteredProdutos: Produto[] = [];
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: RecebimentosService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private router: ActivatedRoute,
    public formUtils: FormUtilsService,
    private produtosService: ProdutosService
  ) {
  }
  private parseDate(dateStr: string): Date | null {
    const [day, month, year] = dateStr.split('-').map(Number);
    if (day && month && year) {
      return new Date(year, month - 1, day);
    }
    return null;
  }

  private formatDateForBackend(date: Date | null): string {
    if (!date) return '';
    return moment(date).format('DD-MM-YYYY');
  }
  ngOnInit(): void {
    this.produtosService.list().subscribe((produtos) => {
      this.produtos = produtos;
      this.filteredProdutos = produtos;
    });
    const recebimento: Recebimento = this.router.snapshot.data['recebimento'];

    const dataRecebimento = typeof recebimento.dataRecebimento === 'string' ? this.parseDate(recebimento.dataRecebimento)
    : recebimento.dataRecebimento;

    this.form = this.formBuilder.group({
      _id: [recebimento._id],
      fornecedorRec: [recebimento.fornecedorRec, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      produto: [recebimento.produto, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      quantidadeRecebimento: [recebimento.quantidadeRecebimento, [Validators.required]],
      valorRecebimento: [recebimento.valorRecebimento, [Validators.required]],
      dataRecebimento: [dataRecebimento, [Validators.required]],
      status: [recebimento.status]
    });
  }

  enviar(): void {
    if (this.form.valid) {
      const formValue = this.prepareSave();

      // Pega o objeto Produto selecionado
      const selectedProduct: Produto = this.form.value.produto;

      formValue.produto = selectedProduct;

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
    this._snackBar.open("Recebimento cadastrado com sucesso!", '', { duration: 3000 });
    this.cancelar();
  }

  onSuccessedit(): void {
    this._snackBar.open("Recebimento editado com sucesso!", '', { duration: 3000 });
    this.cancelar();
  }
  private onError(): void {
    this._snackBar.open("Erro ao salvar recebimento", '', { duration: 3000 });
  }

  private prepareSave(): any {
    const formValue = { ...this.form.value };
    formValue.dataRecebimento = this.formatDateForBackend(formValue.dataRecebimento);
    return formValue;
  }

  searchProducts(event: any): void {
    const query = event.target.value.toLowerCase();
    if (query.trim() !== '') {
      const filteredProducts = this.produtos.filter(product => product.produtoNome.toLowerCase().includes(query));
      this.filteredProdutos = [
        ...filteredProducts.filter(product => product.produtoNome.toLowerCase().startsWith(query)),
        ...filteredProducts.filter(product => !product.produtoNome.toLowerCase().startsWith(query))
      ];
    } else {
      this.filteredProdutos = this.produtos;
    }
  }
}
