import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';

@Component({
  selector: 'app-producao-lista',
  standalone: true,
  templateUrl: './producao-lista.component.html',
  styleUrls: ['./producao-lista.component.scss'],
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, DecimalPipe, DecimalVirgulaPipe]
})
export class ProducaoListaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
