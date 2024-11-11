import { Location, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { DateAdapter, MAT_DATE_LOCALE, MatOption, provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { Produto } from '../../../model/produto';
import { Venda } from '../../../model/venda';
import { ProdutosService } from '../../../services/produtos.service';
import { VendasService } from '../../../services/vendas.service';
import { FormUtilsService } from '../../../shared/form/form-utils.service';

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
    MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatDatepickerToggle,
    NgFor, MatPrefix, MatSuffix, MatCardActions, MatButton, MatDateRangeInput, MatDateRangePicker,MatFormFieldModule,CurrencyMaskModule,NgIf, MatError,  MatDatepicker,
    MatDatepickerInput,
    MatDatepickerModule,
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
    const venda: Venda = this.router.snapshot.data['venda'];
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

    this.produtosService.list().subscribe((produtos) => {
      this.produtos = produtos;
      this.filteredProdutos = produtos;


      if (venda.produtoVenda) {
        const produto = this.produtos.find(p => p._id === venda.produtoVenda?._id);

        if (produto) {
          console.log('Produto encontrado:', produto);
          this.form.patchValue({
            produtoVenda: produto,
            codigoVenda: produto.codigo,
            quantidadeVenda: venda.quantidadeVenda,
            valorVenda: produto.valorProduto,
            statusVenda: venda.statusVenda,
            dataInicial: dataInicial,
            dataFinal: dataFinal
          });
        } else {
          console.log('Produto não encontrado na lista de produtos.');
        }
      }
    });

    this.form.get('produtoVenda')?.valueChanges.subscribe(value => {
      this.onProdutoChange(value);
    });
  }


  public onProdutoChange(produto: Produto): void {
    console.log('Produto selecionado:', produto);
    if (produto) {
      this.form.patchValue({
        codigoVenda: produto.codigo,
        valorVenda: produto.valorProduto
      });
    }
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
