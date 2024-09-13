import { Location, NgFor } from '@angular/common';
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
import { MatFormField, MatFormFieldModule, MatHint, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { Venda } from '../../../model/venda';
import { VendasService } from '../../../services/vendas.service';
import moment from 'moment';

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
    MatDatepickerModule, MatCardActions, MatButton, MatDateRangeInput, MatHint, MatDateRangePicker,MatFormFieldModule, MatDatepicker,
  ]
})
export class VendasFormComponent implements OnInit {
  form!: FormGroup;


  constructor(
    private formBuilder: NonNullableFormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private service: VendasService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private router: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {
    //this.dateAdapter.setLocale('pt');
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
      codigoVenda: [venda.codigoVenda, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      produtoVenda: [venda.produtoVenda, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      quantidadeVenda: [venda.quantidadeVenda, [Validators.required]],
      valorVenda: [venda.valorVenda, [Validators.required]],
      dataInicial: [dataInicial, [Validators.required]],
      dataFinal: [dataFinal, [Validators.required]],
      statusVenda: [venda.statusVenda]
    });

    //console.log('Data Inicial Formatada:', this.form.get('dataInicial')?.value);
    //console.log('Data Final Formatada:', this.form.get('dataFinal')?.value);
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

}
