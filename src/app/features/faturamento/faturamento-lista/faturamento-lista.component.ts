import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';

import { Faturamento } from '../../../model/faturamento';
import { Fornecedor } from '../../../model/fornecedor';
import { FaturamentoService } from '../../../services/faturamento.service';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';
import { FaturamentoComponent } from '../faturamento.component';

@Component({
  selector: 'app-faturamento-lista',
  standalone: true,
  templateUrl: './faturamento-lista.component.html',
  styleUrls: ['./faturamento-lista.component.scss'],
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    DecimalPipe,
    DecimalVirgulaPipe,
    CommonModule,
    MatMenu,
    MatMenuItem,
    MatDivider,
    MatMenuTrigger,
    MatPaginator,
    MatSortModule,
    MatPaginatorModule,
    FaturamentoComponent,
  ],
  providers: [DatePipe],
})
export class FaturamentoListaComponent implements OnInit, AfterViewInit {
  @Input() formatarDataFat!: (data: string) => string;

  @Input() dataSource!: MatTableDataSource<Faturamento>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly displayedColumns = [
    'dataFat',
    'produtoFat',
    'vendaFat',
    'valorFat',
    'prodFat',
    'vcompraFat',
    'lucroFat',
    'perdaFat',
  ];

  constructor(
    public dialog: MatDialog,
    private faturamentoService: FaturamentoService,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {}
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  enviarParaRelatorio() {
    this.faturamentoService.setFinanceiroParaRelatorio(this.dataSource.data);
  }
  toggleDetails(fornecedor: Fornecedor) {
    fornecedor.showDetails = !fornecedor.showDetails;
  }
}
