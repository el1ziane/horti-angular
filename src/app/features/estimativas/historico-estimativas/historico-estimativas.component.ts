import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
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
} from '@angular/material/table';

import { Estimativa } from '../../../model/estimativa';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';
import { DetalhesEstimativasComponent } from '../detalhes-estimativas/detalhes-estimativas.component';

@Component({
  selector: 'app-historico-estimativas',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    DecimalPipe,
    DecimalVirgulaPipe,
    CommonModule,
    MatMenu,
    MatMenuItem,
    MatDivider,
    MatMenuTrigger,
  ],
  templateUrl: './historico-estimativas.component.html',
  styleUrl: './historico-estimativas.component.scss',
})
export class HistoricoEstimativasComponent implements OnInit {
  // @Input() estimativas: Estimativa[] = [];
  @Input() estimativas: Estimativa[] | null = [];

  readonly displayedColumns = [
    'produtoEstimativa',
    'caixaEstimativa',
    'pesoEstimativa',
    'resultado',
  ];

  toggleDetails(estimativa: Estimativa) {
    estimativa.showDetails = !estimativa.showDetails;
  }
  constructor(
    public dialog: MatDialog,
  ) {}
  ngOnInit(): void {}

  openDetailsDialog(estimativa: any): void {
    this.dialog.open(DetalhesEstimativasComponent, {
      width: '300px',
      data: estimativa,
    });
  }
}
