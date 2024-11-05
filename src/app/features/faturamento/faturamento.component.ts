import { AsyncPipe, CommonModule, DatePipe, DecimalPipe, NgForOf, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import moment from 'moment';
import { Observable } from 'rxjs';

import { Faturamento} from '../../model/faturamento';
import { FaturamentoService } from '../../services/faturamento.service';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { DecimalVirgulaPipe } from '../../shared/decimal-virgula.pipe';
import { FaturamentoListaComponent } from './faturamento-lista/faturamento-lista.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-faturamento',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatToolbar,
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
    FaIconComponent,
    NgIf,
    FaturamentoListaComponent,
    MatProgressSpinner,
    AsyncPipe,
    NgStyle,
    NgForOf,
    MatFormField,
    MatOption,
    MatSelect,
    MatLabel,
    MatInputModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatPrefix,
    MatSuffix,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    DecimalPipe,
    DecimalVirgulaPipe,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './faturamento.component.html',
  styleUrl: './faturamento.component.scss',
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None,
})
export class FaturamentoComponent implements OnInit {
  readonly date = new FormControl(moment());
  selectedMonth: number;
  mesAno: string = '';
  financeiro$: Observable<Faturamento[]> | null = null;
  showPrintSection: boolean = false;
  dataSource: MatTableDataSource<Faturamento> = new MatTableDataSource<Faturamento>();
  @ViewChild(FaturamentoListaComponent) faturamentoListaComponent!: FaturamentoListaComponent;
  @ViewChild(MatPaginator, { read: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  showSelectMonthMessage: boolean = true;
  constructor(
    public faturamentoService: FaturamentoService,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
  ) {
    this.atualizar();
    this.selectedMonth = 0;
  }
  ngOnInit(): void {
    this.atualizar();
  }

  setMonthAndYear(
    normalizedMonthAndYear: any,
    datepicker: MatDatepicker<moment.Moment>
  ) {
    const ctrlValue = this.date.value ?? moment();
    const selectedMoment = moment(normalizedMonthAndYear);

    ctrlValue.month(selectedMoment.month());
    ctrlValue.year(selectedMoment.year());

    this.date.setValue(ctrlValue);
    datepicker.close();

    const mesAnoFormatado = `${ctrlValue.year()}-${(ctrlValue.month() + 1)
      .toString()
      .padStart(2, '0')}`;
    this.gerarFinanceiro(mesAnoFormatado);
  }

  months = [
    { label: 'Janeiro', value: 0 },
    { label: 'Fevereiro', value: 1 },
    { label: 'Março', value: 2 },
    { label: 'Abril', value: 3 },
    { label: 'Maio', value: 4 },
    { label: 'Junho', value: 5 },
    { label: 'Julho', value: 6 },
    { label: 'Agosto', value: 7 },
    { label: 'Setembro', value: 8 },
    { label: 'Outubro', value: 9 },
    { label: 'Novembro', value: 10 },
    { label: 'Dezembro', value: 11 },
  ];
  onMonthChange(event: any) {
    console.log('Evento recebido:', event);

    const dataSelecionada = new Date(event);
    this.selectedMonth = dataSelecionada.getMonth();

    console.log('Mês selecionado:', this.selectedMonth);

    this.showSelectMonthMessage = false;

    if (typeof this.selectedMonth === 'number' && !isNaN(this.selectedMonth)) {
      const mesAnoFormatado = this.formatMonthYear(this.selectedMonth);
      console.log('MesAno enviado:', mesAnoFormatado);
      this.gerarFinanceiro(mesAnoFormatado);
    } else {
      console.error(
        'O valor do mês selecionado não é válido:',
        this.selectedMonth
      );
    }
  }

  formatMonthYear(monthIndex: number): string {
    const anoAtual = new Date().getFullYear();
    return `${anoAtual}-${(monthIndex + 1).toString().padStart(2, '0')}`;
  }

  atualizar() {}

  formatarDataFat(dataFat: string): string {
    if (!dataFat) {
      return '';
    }

    const [ano, mes] = dataFat.split('-');
    return `${mes}/${ano}`;
  }

  gerarFinanceiro(mesAno: string): void {
    console.log('MesAno enviado:', mesAno);

    this.faturamentoService.gerarFinanceiro(mesAno).subscribe({
      next: (data) => {
        this.dataSource.data = data.map((item) => ({
          ...item,
          dataFat: mesAno,
        }));
        console.log('Dados financeiros recebidos:', this.dataSource.data);
      },
      error: (err) => {
        console.error('Erro ao chamar a API:', err);
      },
    });
  }

  onReport(): void {
    this.faturamentoListaComponent;

    this.faturamentoListaComponent.enviarParaRelatorio();

    this.cdRef.detectChanges();
    this.faturamentoService.imprimirRelatorio('print-section');

    this.cdRef.detectChanges();
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
