import { AsyncPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { catchError, Observable, of } from 'rxjs';

import { Estimativa } from '../../model/estimativa';
import { EstimativaService } from '../../services/estimativa.service';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { FormEstimativasComponent } from './form-estimativas/form-estimativas.component';
import { HistoricoEstimativasComponent } from './historico-estimativas/historico-estimativas.component';

@Component({
  selector: 'app-estimativas',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatTabsModule,
    FormEstimativasComponent,
    HistoricoEstimativasComponent,
    AsyncPipe,
  ],
  templateUrl: './estimativas.component.html',
  styleUrl: './estimativas.component.scss',
})
export class EstimativasComponent implements OnInit {
  estimativas$: Observable<Estimativa[]> | null = null;
  @ViewChild(HistoricoEstimativasComponent)
  historicoEstimativasComponent!: HistoricoEstimativasComponent;

  constructor(
    private estimativaService: EstimativaService,
    public dialog: MatDialog
  ) {
    this.atualizar();
  }

  atualizar() {
    this.estimativas$ = this.estimativaService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar produtos.');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {}
}
