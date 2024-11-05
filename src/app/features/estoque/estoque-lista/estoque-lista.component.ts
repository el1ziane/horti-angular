import { CommonModule, DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
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
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { Estoque } from '../../../model/estoque';
import { EstoqueService } from '../../../services/estoque.service';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';
import { DetalhesEstoqueDialogComponent } from '../detalhes-estoque-dialog/detalhes-estoque-dialog.component';

@Component({
  selector: 'app-estoque-lista',
  standalone: true,
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, DecimalPipe, DecimalVirgulaPipe, CommonModule, MatMenu, MatMenuItem, MatDivider, MatMenuTrigger, MatPaginator,MatSortModule, MatPaginatorModule, MatFormField, MatLabel, CurrencyMaskModule],
  templateUrl: './estoque-lista.component.html',
  styleUrl: './estoque-lista.component.scss'
})

export class EstoqueListaComponent implements OnInit, AfterViewInit{

  estoque: Estoque[] = [];
  @Input() dataSource!: MatTableDataSource<Estoque>;
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
    this.estoqueService.list().subscribe((estoque) => {
      this.estoque = estoque;
    });

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
