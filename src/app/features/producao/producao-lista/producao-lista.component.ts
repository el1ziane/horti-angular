import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import {DetalhesProducaoDialogComponent} from '../detalhes-producao-dialog/detalhes-producao-dialog.component'
import { MatDialog } from '@angular/material/dialog';
import { Producao } from '../../../model/producao';
import { ProducaoService } from '../../../services/producao.service';



@Component({
    selector: 'app-producao-lista',
    templateUrl: './producao-lista.component.html',
    styleUrl: './producao-lista.component.scss',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, DecimalPipe, DecimalVirgulaPipe, CommonModule, MatMenu, MatMenuItem, MatDivider, MatMenuTrigger]
})
export class ProducaoListaComponent implements OnInit {


  @Input() producoes: Producao[] = [];
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() delete = new EventEmitter(false)

  readonly displayedColumns = ['codigoProducao', 'produtoProducao', 'quantidadeProducao', 'dataProducao','acoes'];

  constructor(public dialog: MatDialog, private producaoService: ProducaoService){}
  ngOnInit(): void {}
  toggleDetails(producao: Producao) {
    producao.showDetails = !producao.showDetails;
  }

  enviarParaRelatorio() {
    console.log(this.producoes)
    this.producaoService.setProducaoParaRelatorio(this.producoes);
  }
  onAdd() {
    this.add.emit(true);

  }
  onEdit(producao: Producao){
    this.edit.emit(producao);
  }
  onDelete(producao:Producao){
    this.delete.emit(producao);
  }

  openDetailsDialog(producao: any): void {
    this.dialog.open(DetalhesProducaoDialogComponent, {
      width: '300px',
      data: producao
    });
  }
}
