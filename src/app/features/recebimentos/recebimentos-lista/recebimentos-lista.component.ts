import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recebimento } from '../../../model/recebimento';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { DecimalPipe } from '@angular/common';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';



@Component({
    selector: 'app-recebimentos-lista',
    templateUrl: './recebimentos-lista.component.html',
    styleUrl: './recebimentos-lista.component.scss',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, DecimalPipe, DecimalVirgulaPipe]
})
export class RecebimentosListaComponent implements OnInit {

  @Input() recebimentos: Recebimento[] = [];
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() delete = new EventEmitter(false)

  readonly displayedColumns = ['fornecedorRec', 'produto', 'quantidadeRecebimento', 'valorRecebimento', 'dataRecebimento', 'status','acoes'];

  constructor(){}
  ngOnInit(): void {

  }

  onAdd() {
    this.add.emit(true);

  }
  onEdit(recebimento: Recebimento){
    this.edit.emit(recebimento);
  }
  onDelete(recebimento:Recebimento){
    this.delete.emit(recebimento);
  }
}
