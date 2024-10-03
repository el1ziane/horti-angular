import { Location, NgFor } from '@angular/common';
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
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { ProducaoService } from '../../../services/producao.service';
import { Producao } from '../../../model/producao';
import moment from 'moment';
import { EstoqueService } from '../../../services/estoque.service';
import { Estoque } from '../../../model/estoque';


@Component({
    selector: 'app-form-producao',
    templateUrl: './form-producao.component.html',
    styleUrls: ['./form-producao.component.scss'],
    providers: [
      provideNativeDateAdapter(),
      {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    ],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatAutocompleteTrigger, MatAutocomplete, NgFor, MatPrefix, MatSuffix, MatDatepickerInput, MatDatepickerToggle, MatDatepicker, MatCardActions, MatButton, ]
})
export class FormProducaoComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: ProducaoService,
    private estoqueService: EstoqueService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private router: ActivatedRoute,
    public formUtils: FormUtilsService
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
    const producao: Producao = this.router.snapshot.data['producao'];

    const dataProducao = typeof producao.dataProducao === 'string' ? this.parseDate(producao.dataProducao)
    : producao.dataProducao;

    this.form = this.formBuilder.group({
      _id: [producao._id],
      codigoProducao: [producao.codigoProducao, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      produtoProducao: [producao.produtoProducao, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      quantidadeProducao: [producao.quantidadeProducao, [Validators.required]],
      dataProducao: [dataProducao, [Validators.required]],
    });
  }

  enviar(): void {
    if (this.form.valid) {
      const formValue = this.prepareSave();
      if (formValue._id) {
        this.service.editar(formValue).subscribe(
          result => {
            this.atualizarEstoque(formValue); // Atualiza o estoque após a edição
            this.onSuccessedit();
          },
          error => this.onError()
        );
      } else {
        this.service.salvar(formValue).subscribe(
          result => {
            this.atualizarEstoque(formValue); // Atualiza o estoque após a criação
            this.onSuccess();
          },
          error => this.onError()
        );
      }
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  private atualizarEstoque(producao: Producao): void {
    const estoqueItem: Estoque = {
      _id: producao._id,
      codigoEstoque: producao.codigoProducao, // Ajuste conforme necessário
      produtoEstoque: producao.produtoProducao,
      quantidadeEstoque: producao.quantidadeProducao,
      valorUnitarioEstoque:0,
      valorTotalEstoque:0,
      dataEstoque: producao.dataProducao // Formate conforme necessário
    };

    this.estoqueService.adicionarAoEstoque(estoqueItem).subscribe(
      response => {
        console.log("Estoque atualizado com sucesso:", response);
      },
      error => {
        this._snackBar.open("Erro ao atualizar estoque", '', { duration: 3000 });
      }
    );
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

}
