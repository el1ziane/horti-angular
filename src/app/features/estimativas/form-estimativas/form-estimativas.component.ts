import { Location, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { ProdutosService } from '../../../services/produtos.service';
import { Produto } from '../../../model/produto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { Estimativa } from '../../../model/estimativa';
import { EstimativaService } from '../../../services/estimativa.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-form-estimativas',
  standalone: true,
  imports: [MatRadioModule, FormsModule,MatCard, MatCardHeader, MatCardTitle, MatCardContent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatAutocompleteTrigger, MatAutocomplete, NgFor, MatPrefix, MatSuffix, MatDatepickerInput, MatDatepickerToggle, MatDatepicker, MatCardActions, MatButton, NgIf],
  templateUrl: './form-estimativas.component.html',
  styleUrl: './form-estimativas.component.scss'
})
export class FormEstimativasComponent implements OnInit{


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
  ) {
  }

  ngOnInit(): void {
    this.produtosService.list().subscribe((produtos) => {
      this.produtos = produtos;
      this.filteredProdutos = produtos;
    });

    const estimativa: Estimativa | null = this.router.snapshot.data['estimativa'] || null;

    this.form = this.formBuilder.group({
      _id: [estimativa ? estimativa._id : null],
      produtoEstimativa: [estimativa ? estimativa.produtoEstimativa : '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      caixaEstimativa: [{ value: estimativa ? estimativa.caixaEstimativa : null, disabled: true }, [Validators.required]],
      pesoEstimativa: [{ value: estimativa ? estimativa.pesoEstimativa : null, disabled: true }, [Validators.required]],
      tipoEntrada: ['', [Validators.required]],
    });

    // Assine as mudanças no tipo de entrada
    this.form.get('tipoEntrada')!.valueChanges.subscribe((selectedTipo) => {
      if (selectedTipo === 'Peso') {
        this.form.get('pesoEstimativa')!.enable();
        this.form.get('caixaEstimativa')!.disable();
      } else if (selectedTipo === 'Caixa') {
        this.form.get('caixaEstimativa')!.enable();
        this.form.get('pesoEstimativa')!.disable();
      }
    });
  }


  enviar(): void {
    if (this.form.valid) {
      const formValue = this.prepareSave();

      // Pega o objeto Produto selecionado
      const selectedProduct: Produto = this.form.value.produtoEstimativa;
      formValue.produtoEstimativa = selectedProduct;

      // Verifica o tipo de entrada para garantir que apenas um valor seja enviado
      if (formValue.tipoEntrada === 'PESO') {
        formValue.caixaEstimativa = null;
      } else if (formValue.tipoEntrada === 'CAIXA') {
        formValue.pesoEstimativa = null;
      }

      // Enviar para o backend
      this.service.salvar(formValue).subscribe(
        //result => this.onSuccess(),
        error => this.onError()
      );
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }




  cancelar(): void {
    this.location.back();
  }

  private onError(): void {
    this._snackBar.open("Erro ao salvar recebimento", '', { duration: 3000 });
  }

  private prepareSave(): any {
    const formValue = { ...this.form.value };
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
  limpar(): void {
    this.form.reset();
    this.resultado = 0;
  }
  calcular(): void {
    const tipo = this.form.get('tipoEntrada')!.value;
    this.produtoSelecionado = this.form.get('produtoEstimativa')!.value; // Armazena o nome do produto

    if (tipo === 'Peso') {
      this.resultado = this.form.get('pesoEstimativa')!.value * 2;  // Exemplo de cálculo
    } else if (tipo === 'Caixa') {
      this.resultado = this.form.get('caixaEstimativa')!.value * 3;  // Exemplo de cálculo
    }
    const formValue = this.prepareSave();
    formValue.produtoEstimativa = this.produtoSelecionado;

    // Chamar o serviço para salvar
    this.service.salvar(formValue).subscribe({
      next: (result) => {
        //this.onSuccess();
      },
      error: (error) => {
        this.onError();
      }
    });

  }
  }



