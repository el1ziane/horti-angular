import { Location, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats, MatOption } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Recebimento } from '../../../model/recebimento';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { AppDateAdapter } from '../../../app-data';
import { MatButton } from '@angular/material/button';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { RecebimentosService } from '../../../services/recebimentos.service';

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
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    ],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatAutocompleteTrigger, MatAutocomplete, NgFor, MatPrefix, MatSuffix, MatDatepickerInput, MatDatepickerToggle, MatDatepicker, MatCardActions, MatButton, ]
})
export class FormRecebimentoComponent implements OnInit {

  produtos: string[] = ['Alface', 'Vagem', 'Tomate', 'Cenoura'];
  filteredProdutos: string[] = this.produtos;
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private service: RecebimentosService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private router: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    const recebimento: Recebimento = this.router.snapshot.data['recebimento'];
    this.form = this.formBuilder.group({
      _id: [recebimento._id],
      fornecedorRec: [recebimento.fornecedorRec, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      produto: [recebimento.produto, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      quantidadeRecebimento: [recebimento.quantidadeRecebimento, [Validators.required]],
      valorRecebimento: [recebimento.valorRecebimento, [Validators.required]],
      dataRecebimento: [this.formatDate(recebimento.dataRecebimento), [Validators.required]],
      status: [recebimento.status]
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

  private formatDate(date: string | Date): string {
    if (typeof date === 'string') {
      const parts = date.split('-');
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }
    const parsedDate = new Date(date);
    const day = this._formatNumber(parsedDate.getDate());
    const month = this._formatNumber(parsedDate.getMonth() + 1);
    const year = parsedDate.getFullYear();
    return `${day}-${month}-${year}`;
  }

  private formatDateForBackend(date: string | Date): string {
    if (typeof date === 'string') {
      const parts = date.split('-');
      if (parts.length === 3) {
        return `${parts[2]}-${this._formatNumber(parseInt(parts[1]))}-${this._formatNumber(parseInt(parts[0]))}`;
      }
    }
    const parsedDate = new Date(date);
    const day = this._formatNumber(parsedDate.getDate());
    const month = this._formatNumber(parsedDate.getMonth() + 1);
    const year = parsedDate.getFullYear();
    return `${day}-${month}-${year}`;
  }

  private _formatNumber(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  searchProducts(event: any): void {
    const query = event.target.value.toLowerCase();
    if (query.trim() !== '') {
      const filteredProducts = this.produtos.filter(product => product.toLowerCase().includes(query));
      this.filteredProdutos = [
        ...filteredProducts.filter(product => product.toLowerCase().startsWith(query)),
        ...filteredProducts.filter(product => !product.toLowerCase().startsWith(query))
      ];
    } else {
      this.filteredProdutos = this.produtos;
    }
  }
}
