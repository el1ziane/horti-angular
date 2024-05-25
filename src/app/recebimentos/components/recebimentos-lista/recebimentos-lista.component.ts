import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recebimento } from '../../model/recebimento';



@Component({
  selector: 'app-recebimentos-lista',
  templateUrl: './recebimentos-lista.component.html',
  styleUrl: './recebimentos-lista.component.scss'
})
export class RecebimentosListaComponent implements OnInit {

  @Input() recebimentos: Recebimento[] = [];
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() delete = new EventEmitter(false)

  readonly displayedColumns = ['fornecedor', 'produto', 'quantidadeRecebimento', 'valorRecebimento', 'dataRecebimento', 'status','acoes'];

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
