import { DecimalPipe, CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatTableDataSource } from '@angular/material/table';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';
import { Estoque } from '../../../model/estoque';
import { EstoqueService } from '../../../services/estoque.service';
import { MatDialog } from '@angular/material/dialog';
import { DetalhesEstoqueDialogComponent } from '../detalhes-estoque-dialog/detalhes-estoque-dialog.component';

@Component({
  selector: 'app-estoque-lista',
  standalone: true,
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, DecimalPipe, DecimalVirgulaPipe, CommonModule, MatMenu, MatMenuItem, MatDivider, MatMenuTrigger, MatPaginator,MatSortModule, MatPaginatorModule, MatFormField, MatLabel],
  templateUrl: './estoque-lista.component.html',
  styleUrl: './estoque-lista.component.scss'
})
export class EstoqueListaComponent implements OnInit, AfterViewInit{
  @Input() dataSource!: MatTableDataSource<Estoque>;
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() delete = new EventEmitter(false)

  readonly displayedColumns = ['codigoEstoque', 'produtoEstoque', 'quantidadeEstoque', 'valorUnitarioEstoque', 'valorTotalEstoque', 'dataEstoque', 'acoes'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
 // dataSource: MatTableDataSource<Produto>;
  toggleDetails(estoque: Estoque) {
    estoque.showDetails = !estoque.showDetails;
  }
  constructor(public dialog: MatDialog, private estoqueService: EstoqueService){

  }

  ngOnInit(): void {

  }


  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }

  enviarParaRelatorio() {
    this.estoqueService.setEstoqueParaRelatorio(this.dataSource.data);
  }

  onAdd() {
    this.add.emit(true);

  }

  onDelete(estoque:Estoque){
    this.delete.emit(estoque);
  }
  openDetailsDialog(estoque: any): void {
    this.dialog.open(DetalhesEstoqueDialogComponent, {
      width: '300px',
      data: estoque
    });
  }
}
