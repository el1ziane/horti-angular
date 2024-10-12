import { Location, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE, MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { MatButton } from '@angular/material/button';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker, MatDateRangeInput, MatDateRangePicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatError, MatFormField, MatFormFieldModule, MatHint, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { Venda } from '../../../model/venda';
import { VendasService } from '../../../services/vendas.service';
import moment from 'moment';
import { Produto } from '../../../model/produto';
import { ProdutosService } from '../../../services/produtos.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@Component({
  selector: 'app-vendas-form',
  templateUrl: './vendas-form.component.html',
  styleUrls: ['./vendas-form.component.scss'],
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCard, MatCardHeader, MatCardTitle, MatCardContent, ReactiveFormsModule,
    MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatAutocompleteTrigger,
    MatAutocomplete, NgFor, MatPrefix, MatSuffix, MatDatepickerInput, MatDatepickerToggle,
    MatDatepickerModule, MatCardActions, MatButton, MatDateRangeInput, MatHint, MatDateRangePicker,MatFormFieldModule, MatDatepicker,CurrencyMaskModule,NgIf, MatError
  ]
})
export class VendasFormComponent implements OnInit {
  produtos: Produto[] = [];
  filteredProdutos: Produto[] = [];
  form!: FormGroup;



  constructor(
    private formBuilder: NonNullableFormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private vendaService: VendasService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private router: ActivatedRoute,
    private produtosService: ProdutosService,
    public formUtils: FormUtilsService
  ) {
    //this.dateAdapter.setLocale('pt');
  }

  ngOnInit(): void {
    this.produtosService.list().subscribe((produtos) => {
      this.produtos = produtos;
      this.filteredProdutos = produtos;
    });
    const venda: Venda = this.router.snapshot.data['venda'];

    //console.log('Data Inicial Original Recebida:', venda.dataInicial);
    //console.log('Data Final Original Recebida:', venda.dataFinal);
    const dataInicial = typeof venda.dataInicial === 'string'
    ? this.parseDate(venda.dataInicial)
    : venda.dataInicial;

  const dataFinal = typeof venda.dataFinal === 'string'
    ? this.parseDate(venda.dataFinal)
    : venda.dataFinal;

    this.form = this.formBuilder.group({
      _id: [venda._id],
      codigoVenda: [venda.codigoVenda, [Validators.required]],
      produtoVenda: [venda.produtoVenda, [Validators.required]],
      quantidadeVenda: [venda.quantidadeVenda, [Validators.required]],
      valorVenda: [venda.valorVenda, [Validators.required]],
      dataInicial: [dataInicial, [Validators.required]],
      dataFinal: [dataFinal, [Validators.required]],
      statusVenda: [venda.statusVenda]
    });

    this.form.get('produtoVenda')?.valueChanges.subscribe(value => {
      this.onProdutoChange(value);
    });
  }


  private onProdutoChange(produtoNome: string): void {
    this.vendaService.verificarProduto(produtoNome).subscribe(produto => {
      if (produto) {

        this.form.patchValue({
          codigoVenda: produto.codigo
        });
      }
    });

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

  enviar(): void {
    if (this.form.valid) {
      const formValue = this.prepareSave();
      const selectedProduct: Produto = this.form.value.produtoVenda;
      formValue.produtoVenda = selectedProduct;

      if (formValue._id) {
        this.vendaService.editar(formValue).subscribe(
          result => this.onSuccessedit(),
          error => this.onError()
        );
      } else {
        this.vendaService.salvar(formValue).subscribe(
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
    this._snackBar.open("Venda cadastrada com sucesso!", '', { duration: 3000 });
    this.cancelar();
  }

  onSuccessedit(): void {
    this._snackBar.open("Venda editada com sucesso!", '', { duration: 3000 });
    this.cancelar();
  }

  private onError(): void {
    this._snackBar.open("Erro ao salvar venda", '', { duration: 3000 });
  }

  private prepareSave(): any {
    const formValue = { ...this.form.value };
    formValue.dataInicial = this.formatDateForBackend(formValue.dataInicial);
    formValue.dataFinal = this.formatDateForBackend(formValue.dataFinal);
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
