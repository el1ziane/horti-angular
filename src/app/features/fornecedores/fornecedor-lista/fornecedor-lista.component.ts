import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Fornecedor } from '../../../model/fornecedor';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';
import { MatDivider } from '@angular/material/divider';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DetalhesFornecedoresDialogComponent } from '../detalhes-fornecedores-dialog/detalhes-fornecedores-dialog.component';
import { FornecedoresService } from '../../../services/fornecedores.service';

@Component({
  selector: 'app-fornecedor-lista',
  standalone: true,
  templateUrl: './fornecedor-lista.component.html',
  styleUrls: ['./fornecedor-lista.component.scss'],
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, DecimalPipe, DecimalVirgulaPipe, CommonModule, MatMenu, MatMenuItem, MatDivider, MatMenuTrigger]
})
export class FornecedorListaComponent implements OnInit {

  @Input() fornecedor: Fornecedor[] = [];
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() delete = new EventEmitter(false)

  readonly displayedColumns = ['fornecedorNome', 'cnpj', 'telefone', 'email', 'acoes'];

  constructor(public dialog: MatDialog, private fornecedoresService: FornecedoresService){}
  ngOnInit(): void {

  }
  toggleDetails(fornecedor: Fornecedor) {
    fornecedor.showDetails = !fornecedor.showDetails;
  }
  enviarParaRelatorio() {
    console.log(this.fornecedor)
    this.fornecedoresService.setFornecedorParaRelatorio(this.fornecedor);
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

}
