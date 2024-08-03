import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produto } from '../../../model/produto';
import { DecimalPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';

@Component({
  selector: 'app-produtos-lista',
  standalone: true,
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, DecimalPipe, DecimalVirgulaPipe],
  templateUrl: './produtos-lista.component.html',
  styleUrl: './produtos-lista.component.scss'
})
export class ProdutosListaComponent implements OnInit {

  @Input() produtos: Produto[] = [];
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() delete = new EventEmitter(false)

  readonly displayedColumns = ['codigo', 'produtoNome', 'quantidadeProduto', 'valorProduto', 'peso','acoes'];

  constructor(){}
  ngOnInit(): void {

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
}

