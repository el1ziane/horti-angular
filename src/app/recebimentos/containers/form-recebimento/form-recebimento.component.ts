
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators} from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RecebimentosService } from '../../services/recebimentos.service';
import { ActivatedRoute } from '@angular/router';
import { Recebimento } from '../../model/recebimento';
import { FormUtilsService } from '../../../shared/form/form-utils.service';

// Definição dos formatos de data
export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { day: 'numeric', month: 'numeric', year: 'numeric' }
  },
  display: {
    dateInput: 'input',
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
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ]
})
export class FormRecebimentoComponent implements OnInit {

  form!: FormGroup;
  /*form= this.formBuilder.group({
    _id: [''],
    fornecedor: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    produto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    quantidadeRecebimento: [0, [Validators.required]],
    valorRecebimento: [0, [Validators.required]],
    dataRecebimento: [new Date()],
    status: ['']
  });**/

  constructor(private formBuilder: NonNullableFormBuilder, private dateAdapter: DateAdapter<Date>, private service: RecebimentosService, private _snackBar: MatSnackBar, private location: Location, private router: ActivatedRoute, public formUtils: FormUtilsService) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    const recebimento: Recebimento = this.router.snapshot.data['recebimento'];
    this.form= this.formBuilder.group({
      _id: [recebimento._id],
      fornecedor: [recebimento.fornecedor,[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      produto: [recebimento.produto, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      quantidadeRecebimento: [recebimento.quantidadeRecebimento, [Validators.required]],
      valorRecebimento: [recebimento.valorRecebimento, [Validators.required]],
      dataRecebimento:[recebimento.dataRecebimento, [new Date()]],
      status: [recebimento.status]
    });
    /*this.form.setValue({
      _id: recebimento._id,
      fornecedor: recebimento.fornecedor,
      produto: recebimento.produto,
      quantidadeRecebimento: recebimento.quantidadeRecebimento,
      valorRecebimento: recebimento.valorRecebimento,
      dataRecebimento: recebimento.dataRecebimento,
      status: recebimento.status
    });**/


  }

  enviar(){
    if (this.form.valid) {
      this.service.salvar(this.form.value).subscribe(result=> this.onSuccess(), error => this.onError());
    }else{
      alert('form invalido')
    }


    }

    cancelar(){
      this.location.back();
    }

    onSuccess(){
      this._snackBar.open("Recebimento cadastrado com sucesso!", '',{duration:3000});
      this.cancelar();
    }


    private onError(){
      this._snackBar.open("Erro ao salvar recebimento", '',{duration:3000});
    }
    getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength']: 3;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength']: 100;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }
    return 'Campo invalido';
  }


  produtos: string[] = ['Alface', 'Vagem', 'Tomate', 'Cenoura'];

  searchProducts(event: any): void {
    const query = event.target.value.toLowerCase();
    if (query.trim() !== '') {
      const filteredProducts = this.produtos.filter(product => product.toLowerCase().includes(query));
      const sortedProducts = [...filteredProducts.filter(product => product.toLowerCase().startsWith(query)), ...filteredProducts.filter(product => !product.toLowerCase().startsWith(query))];
      this.produtos = sortedProducts;
    } else {
      this.produtos = ['Alface', 'Vagem', 'Tomate', 'Cenoura'];
    }
  }
  }




