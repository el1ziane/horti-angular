import { Location, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Compra } from '../../../../model/compra';
import { FormUtilsService } from '../../../../shared/form/form-utils.service';
import { MatButton } from '@angular/material/button';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { CompraService } from '../../../../services/compra.service';
import { Produto } from '../../../../model/produto';
import { ProdutosService } from '../../../../services/produtos.service';
import moment from 'moment';
import { CurrencyMaskModule } from 'ng2-currency-mask';



@Component({
    selector: 'app-form-compra',
    templateUrl: './form-compra.component.html',
    styleUrls: ['./form-compra.component.scss'],
    providers: [
      provideNativeDateAdapter(),
      {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    ],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatAutocompleteTrigger, MatAutocomplete, NgFor, MatPrefix, MatSuffix, MatDatepickerInput, MatDatepickerToggle, MatDatepicker, MatCardActions, MatButton, NgIf, MatError, CurrencyMaskModule]
})
export class FormCompraComponent implements OnInit {

  produtos: Produto[] = [];
  filteredProdutos: Produto[] = [];
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CompraService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private router: ActivatedRoute,
    public formUtils: FormUtilsService,
    private produtosService: ProdutosService
  ) {
  }

  ngOnInit(): void {
    const compra: Compra = this.router.snapshot.data['compra'];


    const dataCompra = typeof compra.dataCompra === 'string' ? this.parseDate(compra.dataCompra)
    : compra.dataCompra;

    this.form = this.formBuilder.group({
      _id: [compra._id],
      fornecedorCompra: [compra.fornecedorCompra, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      produtoCompra: [compra.produtoCompra, [Validators.required]],
      quantidadeCompra: [compra.quantidadeCompra, [Validators.required]],
      valorCompra: [compra.valorCompra, [Validators.required]],
      dataCompra: [dataCompra, [Validators.required]],
      status: [compra.status]
    });

    this.produtosService.list().subscribe((produtos) => {
      this.produtos = produtos;
      this.filteredProdutos = produtos;

      if (compra.produtoCompra) {
        const produto = this.produtos.find(p => p._id === compra.produtoCompra?._id);


          this.form.patchValue({
            produtoCompra: produto,
            fornecedorCompra: compra.fornecedorCompra,
            quantidadeCompra: compra.quantidadeCompra,
            valorCompra: compra.valorCompra,
            dataCompra: dataCompra,
            status: compra.status
          });
        }
      }
    );

    this.form.get('produtoCompra')?.valueChanges.subscribe(value => {
      this.onProdutoChange(value);
    });
  }
  public onProdutoChange(produto: Produto): void {
    console.log('Produto selecionado:', produto);

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
    this._snackBar.open("Compra cadastrada com sucesso!", '', { duration: 3000 });
    this.cancelar();
  }

  onSuccessedit(): void {
    this._snackBar.open("compra editada com sucesso!", '', { duration: 3000 });
    this.cancelar();
  }
  private onError(): void {
    this._snackBar.open("Erro ao salvar compra", '', { duration: 3000 });
  }

  private prepareSave(): any {
    const formValue = { ...this.form.value };
    formValue.dataCompra = this.formatDateForBackend(formValue.dataCompra);
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
