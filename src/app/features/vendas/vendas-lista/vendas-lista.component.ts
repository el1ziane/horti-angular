import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatTableDataSource } from '@angular/material/table';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';
import { Venda } from '../../../model/venda';
import { MatDivider } from '@angular/material/divider';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DetalhesVendasDialogComponent } from '../detalhes-vendas-dialog/detalhes-vendas-dialog.component';
import { VendasService } from '../../../services/vendas.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';



@Component({
    selector: 'app-vendas-lista',
    templateUrl: './vendas-lista.component.html',
    styleUrl: './vendas-lista.component.scss',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, DecimalPipe, DecimalVirgulaPipe, CommonModule, MatMenu, MatMenuItem, MatDivider, MatMenuTrigger,MatPaginator,MatSortModule, MatPaginatorModule]
})
export class VendasListaComponent implements OnInit, AfterViewInit {

  @Input() dataSource!: MatTableDataSource<Venda>;
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() delete = new EventEmitter(false)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly displayedColumns = ['codigoVenda', 'produtoVenda', 'quantidadeVenda', 'valorVenda', 'periodoVenda', 'statusVenda','acoes'];

  toggleDetails(venda: Venda) {
    venda.showDetails = !venda.showDetails;
  }
  constructor(public dialog: MatDialog, private vendasService: VendasService){}
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }

  enviarParaRelatorio() {
    this.vendasService.setVendasParaRelatorio(this.dataSource.data);
  }

  onAdd() {
    this.add.emit(true);

  }
  onEdit(venda: Venda){
    this.edit.emit(venda);
  }
  onDelete(venda:Venda){
    this.delete.emit(venda);
  }
  openDetailsDialog(venda: any): void {
    this.dialog.open(DetalhesVendasDialogComponent, {
      width: '300px',
      data: venda
    });
  }
}
