import { Location, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Estimativa } from '../../../model/estimativa';
import { Produto } from '../../../model/produto';
import { EstimativaService } from '../../../services/estimativa.service';
import { ProdutosService } from '../../../services/produtos.service';
import { FormUtilsService } from '../../../shared/form/form-utils.service';

@Component({
  selector: 'app-form-estimativas',
  standalone: true,
  imports: [
    MatRadioModule,
    FormsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    MatAutocompleteTrigger,
    MatAutocomplete,
    NgFor,
    MatPrefix,
    MatSuffix,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatCardActions,
    MatButton,
    NgIf,
  ],
  templateUrl: './form-estimativas.component.html',
  styleUrl: './form-estimativas.component.scss',
})
export class FormEstimativasComponent implements OnInit {
  //tipoEntrada: string;
  tipos: string[] = ['Peso', 'Caixa'];
  produtos: Produto[] = [];
  filteredProdutos: Produto[] = [];
  form!: FormGroup;
  resultado!: number;
  produtoSelecionado!: string;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: EstimativaService,
    private location: Location,
    private _snackBar: MatSnackBar,
    private router: ActivatedRoute,
    public formUtils: FormUtilsService,
    private produtosService: ProdutosService
  ) {}

  ngOnInit(): void {
    this.produtosService.list().subscribe((produtos) => {
      this.produtos = produtos;
      this.filteredProdutos = produtos;
    });

    const estimativa: Estimativa | null =
      this.router.snapshot.data['estimativa'] || null;

    this.form = this.formBuilder.group({
      _id: [estimativa ? estimativa._id : null],
      produtoEstimativa: [
        estimativa ? estimativa.produtoEstimativa : '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      caixaEstimativa: [
        {
          value: estimativa ? estimativa.caixaEstimativa : null,
          disabled: true,
        },
        [Validators.required],
      ],
      pesoEstimativa: [
        {
          value: estimativa ? estimativa.pesoEstimativa : null,
          disabled: true,
        },
        [Validators.required],
      ],
      tipoEntrada: ['', [Validators.required]],
    });

    this.form.get('tipoEntrada')!.valueChanges.subscribe((selectedTipo) => {
      if (selectedTipo === 'Peso') {
        this.form.get('pesoEstimativa')!.enable();
        this.form.get('caixaEstimativa')!.disable();
      } else if (selectedTipo === 'Caixa') {
        this.form.get('caixaEstimativa')!.enable();
        this.form.get('pesoEstimativa')!.disable();
      }
    });
    this.form.get('produtoEstimativa')?.valueChanges.subscribe(value => {
      this.onProdutoChange(value);
    });
  }
  public onProdutoChange(produto: Produto): void {
    console.log('Produto selecionado:', produto);

  }
  enviar(): void {
    if (this.form.valid) {
        const formValue = this.prepareSave();

        this.service.salvar(formValue).subscribe(
            () => { /* Lógica de sucesso */ },
            () => this.onError()
        );
    } else {
        this.formUtils.validateAllFormFields(this.form);
    }
}


  cancelar(): void {
    this.location.back();
  }

  private onError(): void {
    this._snackBar.open('Erro ao salvar estimativa', '', { duration: 3000 });
  }

  private prepareSave(): any {
    const formValue = { ...this.form.value };
    return formValue;
  }

  searchProducts(event: any): void {
    const query = event.target.value.toLowerCase();
    if (query.trim() !== '') {
      const filteredProducts = this.produtos.filter((product) =>
        product.produtoNome.toLowerCase().includes(query)
      );
      this.filteredProdutos = [
        ...filteredProducts.filter((product) =>
          product.produtoNome.toLowerCase().startsWith(query)
        ),
        ...filteredProducts.filter(
          (product) => !product.produtoNome.toLowerCase().startsWith(query)
        ),
      ];
    } else {
      this.filteredProdutos = this.produtos;
    }
  }
  limpar(): void {
    this.form.reset();
    this.resultado = 0;
  }
  calcular(): void {
    const tipo = this.form.get('tipoEntrada')!.value;
    const pesoEstimativa = this.form.get('pesoEstimativa')!.value;
    const caixaEstimativa = this.form.get('caixaEstimativa')!.value;
    const produtoSelecionado: Produto = this.form.get('produtoEstimativa')!.value;

    // Validação e cálculo do resultado com a mesma lógica do backend
    if (tipo === 'Peso' && pesoEstimativa !== null) {
      // Dividir o peso estimado pelo peso de cada bandeja (produto)
    this.resultado = pesoEstimativa / (produtoSelecionado?.peso || 0);
    } else if (tipo === 'Caixa' && caixaEstimativa !== null) {
      // Multiplicar o número de caixas pela quantidade de itens por caixa
     this.resultado = caixaEstimativa * (produtoSelecionado?.quantidadePorCaixa ?? 0);
    } else {
      this._snackBar.open(
        'Erro: Selecione um tipo de entrada válido e informe o valor correspondente.',
        '',
        { duration: 3000 }
      );
      return;
    }

    // Preparando o valor para salvar
    const formValue = this.prepareSave();
    formValue.produtoEstimativa = produtoSelecionado;
    formValue.resultado = this.resultado;

    // Salvando a estimativa
    this.service.salvar(formValue).subscribe({
      next: () => {
        this._snackBar.open('Estimativa salva com sucesso!', '', {
          duration: 3000,
        });
      },
      error: () => {
        this.onError();
      },
    });
  }

}
