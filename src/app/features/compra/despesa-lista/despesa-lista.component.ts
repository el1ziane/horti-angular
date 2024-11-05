import { Despesa } from '../../../model/despesa';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatTableDataSource } from '@angular/material/table';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';
import { MatDivider } from '@angular/material/divider';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DespesaService } from '../../../services/despesa.service';
import { DetalhesDespesaDialogComponent } from '../detalhes-dialog/detalhes-despesa-dialog/detalhes-despesa-dialog.component



@Component({
    selector: 'app-despesa-lista',
    templateUrl:'./despesa-lista.component.html',
    styleUrl: './despesa-lista.component.scss',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, DecimalPipe, DecimalVirgulaPipe, CommonModule, MatMenu, MatMenuItem, MatDivider, MatMenuTrigger,MatPaginator,MatSortModule, MatPaginatorModule]
})
export class DespesaListaComponent implements OnInit, AfterViewInit {

  @Input() dataSource!: MatTableDataSource<Despesa>;
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() delete = new EventEmitter(false)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly displayedColumns = ['fornecedorDespesa', 'descricaoDespesa',  'valorDespesa', 'dataDespesa', 'statusDespesa','acoes'];


  constructor(public dialog: MatDialog, private despesaService: DespesaService){}
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }
  toggleDetails(despesa: Despesa) {
    despesa.showDetails = !despesa.showDetails;
  }
  enviarParaRelatorio() {
    this.despesaService.setDespesaParaRelatorio(this.dataSource.data);
  }

  onAdd() {
    this.add.emit(true);

  }
  onEdit(despesa: Despesa) {
    this.edit.emit(despesa);
  }
  onDelete(despesa: Despesa) {
    this.delete.emit(despesa);
  }
  openDetailsDialog(despesa: any): void {
    this.dialog.open(DetalhesDespesaDialogComponent, {
      width: '300px',
      data: despesa
    });
  }
}
