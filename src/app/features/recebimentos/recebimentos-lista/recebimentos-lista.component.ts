import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recebimento } from '../../../model/recebimento';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { DetalhesDialogComponent } from '../detalhes-dialog/detalhes-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RecebimentosService } from '../../../services/recebimentos.service';



@Component({
    selector: 'app-recebimentos-lista',
    templateUrl: './recebimentos-lista.component.html',
    styleUrl: './recebimentos-lista.component.scss',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, DecimalPipe, DecimalVirgulaPipe, CommonModule, MatMenu, MatMenuItem, MatDivider, MatMenuTrigger]
})
export class RecebimentosListaComponent implements OnInit {


  @Input() recebimentos: Recebimento[] = [];
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() delete = new EventEmitter(false)

  readonly displayedColumns = ['fornecedorRec', 'produto', 'quantidadeRecebimento', 'valorRecebimento', 'dataRecebimento', 'status','acoes'];

  constructor(public dialog: MatDialog, private recebimentosService: RecebimentosService){}
  ngOnInit(): void {

  }

  toggleDetails(recebimento: Recebimento) {
    recebimento.showDetails = !recebimento.showDetails;
  }

  enviarParaRelatorio() {
    this.recebimentosService.setRecebimentoParaRelatorio(this.recebimentos);
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

  openDetailsDialog(recebimento: any): void {
    this.dialog.open(DetalhesDialogComponent, {
      width: '300px',
      data: recebimento
    });
  }
}
