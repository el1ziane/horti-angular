import { Location, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { MatButton } from '@angular/material/button';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { ProducaoService } from '../../../services/producao.service';
import { Producao } from '../../../model/producao';
import moment from 'moment';
import { EstoqueService } from '../../../services/estoque.service';
import { ProdutosService } from '../../../services/produtos.service';
import { Produto } from '../../../model/produto';


@Component({
    selector: 'app-form-producao',
    templateUrl: './form-producao.component.html',
    styleUrls: ['./form-producao.component.scss'],
    providers: [
      provideNativeDateAdapter(),
      {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    ],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatAutocompleteTrigger, MatAutocomplete, NgFor, MatPrefix, MatSuffix, MatDatepickerInput, MatDatepickerToggle, MatDatepicker, MatCardActions, MatButton, NgIf, MatError]
})
export class FormProducaoComponent implements OnInit {

  produtos: Produto[] = [];
  filteredProdutos: Produto[] = [];
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: ProducaoService,
    private estoqueService: EstoqueService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private router: ActivatedRoute,
    public formUtils: FormUtilsService,
    private produtosService: ProdutosService
  ) {

  }

  ngOnInit(): void {
    const producao: Producao = this.router.snapshot.data['producao'];
    const dataProducao = typeof producao.dataProducao === 'string' ? this.parseDate(producao.dataProducao): producao.dataProducao;

    this.form = this.formBuilder.group({
      _id: [producao._id],
      codigoProducao: [producao.codigoProducao, [Validators.required]],
      produtoProducao: [producao.produtoProducao, [Validators.required]],
      quantidadeProducao: [producao.quantidadeProducao, [Validators.required]],
      dataProducao: [dataProducao, [Validators.required]],
    });

    this.produtosService.list().subscribe((produtos) => {
      this.produtos = produtos;
      this.filteredProdutos = produtos;
    });

    if (producao.produtoProducao) {
      const produto = this.produtos.find(p => p._id === producao.produtoProducao?._id);

      if (produto) { // Add this null check
        console.log('Produto encontrado:', produto);
        this.form.patchValue({
          produtoProducao: produto,
          codigoProducao: produto.codigo,
          quantidadeProducao: producao.quantidadeProducao,
          dataProducao: dataProducao
        });
      } else {
        console.log('Produto não encontrado');
      }
    }

      this.form.get('produtoProducao')?.valueChanges.subscribe(value => {
        this.onProdutoChange(value);
      });

  }
  public onProdutoChange(produto: Produto): void {
    console.log('Produto selecionado:', produto);
    if (produto) {
      this.form.patchValue({
        codigoProducao: produto.codigo
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
        this.service.editar(formValue).subscribe(
          result => {
           // this.atualizarEstoque(formValue);
            this.onSuccessedit();
          },
          error => this.onError()
        );
      } else {
        this.service.salvar(formValue).subscribe(
          result => {
          //  this.atualizarEstoque(formValue); 
            this.onSuccess();
          },
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
    this._snackBar.open("Produção cadastrada com sucesso!", '', { duration: 3000 });
    this.cancelar();
  }

  onSuccessedit(): void {
    this._snackBar.open("Produção editado com sucesso!", '', { duration: 3000 });
    this.cancelar();
  }
  private onError(): void {
    this._snackBar.open("Erro ao salvar produção", '', { duration: 3000 });
  }

  private prepareSave(): any {
    const formValue = { ...this.form.value };
    formValue.dataProducao = this.formatDateForBackend(formValue.dataProducao);
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