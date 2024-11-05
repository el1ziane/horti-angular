import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatTableDataSource } from '@angular/material/table';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { DetalhesDialogComponent } from '../detalhes-dialog/detalhes-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Compra } from '../../../model/compra';
import { CompraService } from '../../../services/compra.service';



@Component({
    selector: 'app-compra-lista',
    templateUrl: './compra-lista.component.html',
    styleUrl: './compra-lista.component.scss',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, DecimalPipe, DecimalVirgulaPipe, CommonModule, MatMenu, MatMenuItem, MatDivider, MatMenuTrigger,MatPaginator,MatSortModule, MatPaginatorModule]
})
export class CompraListaComponent implements OnInit, AfterViewInit {


  @Input() dataSource!: MatTableDataSource<Compra>;
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() delete = new EventEmitter(false)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly displayedColumns = ['fornecedorRec', 'produto', 'quantidadeRecebimento', 'valorRecebimento', 'dataRecebimento', 'status','acoes'];

  constructor(public dialog: MatDialog, private compraService: CompraService){}
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }

  toggleDetails(compra: Compra) {
    compra.showDetails = !compra.showDetails;
  }

  enviarParaRelatorio() {
    this.compraService.setCompraParaRelatorio(this.dataSource.data);
  }

  onAdd() {
    this.add.emit(true);

  }
  onEdit(compra: Compra){
    this.edit.emit(compra);
  }
  onDelete(compra:Compra){
    this.delete.emit(compra);
  }

  openDetailsDialog(compra: any): void {
    this.dialog.open(DetalhesDialogComponent, {
      width: '300px',
      data: compra
    });
  }
}
