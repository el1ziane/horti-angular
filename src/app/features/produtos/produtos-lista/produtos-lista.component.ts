import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Produto } from '../../../model/produto';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatTableDataSource } from '@angular/material/table';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';
import { MatDivider } from '@angular/material/divider';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { DetalhesProdutosDialogComponent } from '../detalhes-produtos-dialog/detalhes-produtos-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProdutosService } from '../../../services/produtos.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-produtos-lista',
  standalone: true,
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, DecimalPipe, DecimalVirgulaPipe, CommonModule, MatMenu, MatMenuItem, MatDivider, MatMenuTrigger, MatPaginator,MatSortModule, MatPaginatorModule, MatFormField, MatLabel,],
  templateUrl: './produtos-lista.component.html',
  styleUrl: './produtos-lista.component.scss'
})
export class ProdutosListaComponent implements OnInit, AfterViewInit{

  //@Input() produtos: Produto[] = [];
  @Input() dataSource!: MatTableDataSource<Produto>;
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() delete = new EventEmitter(false)

  readonly displayedColumns = ['codigo', 'produtoNome', 'quantidadeProduto', 'valorProduto', 'peso','acoes'];

 // dataSource = new MatTableDataSource<Produto>();


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
 // dataSource: MatTableDataSource<Produto>;
  toggleDetails(produto: Produto) {
    produto.showDetails = !produto.showDetails;
  }
  constructor(public dialog: MatDialog, private produtosService: ProdutosService){

  }

  ngOnInit(): void {}


  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator; // Atribuição segura
      this.dataSource.sort = this.sort; // Atribuição segura
    }

  }

  enviarParaRelatorio() {
    this.produtosService.setProdutosParaRelatorio(this.dataSource.data);
  }

  onAdd() {
    this.add.emit(true);

  }
  onEdit(produto: Produto){
    this.edit.emit(produto);
  }
  onDelete(produto:Produto){
    this.delete.emit(produto);
  }
  openDetailsDialog(produto: any): void {
    this.dialog.open(DetalhesProdutosDialogComponent, {
      width: '300px',
      data: produto
    });
  }

}

