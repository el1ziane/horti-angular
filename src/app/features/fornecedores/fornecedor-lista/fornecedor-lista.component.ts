import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Fornecedor } from '../../../model/fornecedor';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatTableDataSource } from '@angular/material/table';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';
import { MatDivider } from '@angular/material/divider';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DetalhesFornecedoresDialogComponent } from '../detalhes-fornecedores-dialog/detalhes-fornecedores-dialog.component';
import { FornecedoresService } from '../../../services/fornecedores.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-fornecedor-lista',
  standalone: true,
  templateUrl: './fornecedor-lista.component.html',
  styleUrls: ['./fornecedor-lista.component.scss'],
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, DecimalPipe, DecimalVirgulaPipe, CommonModule, MatMenu, MatMenuItem, MatDivider, MatMenuTrigger, MatPaginator,MatSortModule, MatPaginatorModule]
})
export class FornecedorListaComponent implements OnInit, AfterViewInit {

  //@Input() fornecedor: Fornecedor[] = [];
  @Input() dataSource!: MatTableDataSource<Fornecedor>;
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() delete = new EventEmitter(false)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly displayedColumns = ['fornecedorNome', 'cnpj', 'telefone', 'email', 'acoes'];

  constructor(public dialog: MatDialog, private fornecedoresService: FornecedoresService){}
  ngOnInit(): void {}
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }
  toggleDetails(fornecedor: Fornecedor) {
    fornecedor.showDetails = !fornecedor.showDetails;
  }
  enviarParaRelatorio() {
    this.fornecedoresService.setFornecedorParaRelatorio(this.dataSource.data);
  }

  onAdd() {
    this.add.emit(true);

  }
  onEdit(fornecedor: Fornecedor){
    this.edit.emit(fornecedor);
  }
  onDelete(fornecedor:Fornecedor){
    this.delete.emit(fornecedor);
  }
  openDetailsDialog(fornecedor: any): void {
    this.dialog.open(DetalhesFornecedoresDialogComponent, {
      width: '300px',
      data: fornecedor
    });
  }

  formatarCNPJ(cnpj: string): string {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  formatarTelefone(telefone: string): string {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}
