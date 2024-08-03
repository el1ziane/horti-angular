import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Fornecedor } from '../../../model/fornecedor';
import { DecimalPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';

@Component({
  selector: 'app-fornecedor-lista',
  standalone: true,
  templateUrl: './fornecedor-lista.component.html',
  styleUrls: ['./fornecedor-lista.component.scss'],
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, DecimalPipe, DecimalVirgulaPipe]
})
export class FornecedorListaComponent implements OnInit {

  @Input() fornecedor: Fornecedor[] = [];
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() delete = new EventEmitter(false)

  readonly displayedColumns = ['fornecedorNome', 'cnpj', 'telefone', 'email', 'acoes'];

  constructor(){}
  ngOnInit(): void {

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

}
