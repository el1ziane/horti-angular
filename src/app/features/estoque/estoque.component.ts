import { AsyncPipe, CommonModule, NgForOf, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgxPrintService } from 'ngx-print';
import { Observable, tap } from 'rxjs';

import { Estoque } from '../../model/estoque';
import { EstoqueService } from '../../services/estoque.service';
import { ProducaoService } from '../../services/producao.service';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { RemoverEstoqueDialogComponent } from '../../shared/components/remover-dialog/remover-estoque-dialog.component';
import { EstoqueListaComponent } from './estoque-lista/estoque-lista.component';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatToolbar,
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
    FaIconComponent,
    NgIf,
    EstoqueListaComponent,
    MatProgressSpinner,
    AsyncPipe,
    NgStyle,
    NgForOf,
    CommonModule,
  ],

  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.scss',
})
export class EstoqueComponent implements OnInit {
  estoque: Estoque[] = [];
  estoque$: Observable<Estoque[]> | null = null;
  dataSource: MatTableDataSource<Estoque> = new MatTableDataSource<Estoque>();
  @ViewChild(EstoqueListaComponent)
  estoqueListaComponent!: EstoqueListaComponent;
  @ViewChild(MatPaginator, { read: true }) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  showPrintSection: boolean = false;

  constructor(
    public estoqueService: EstoqueService,
    public producaoService: ProducaoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private printService: NgxPrintService,
    private cdRef: ChangeDetectorRef
  ) {
    this.atualizar();
  }

  atualizar() {
    this.estoque$ = this.estoqueService.list().pipe(
      tap((estoque) => {
        console.log('Dados do estoque:', estoque);
        this.dataSource.data = estoque;
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {
    this.estoqueService.list().subscribe((estoque) => {
      this.estoque = estoque;
    });
    this.atualizar();
  }

  onReport(): void {
    this.estoqueListaComponent;

    this.estoqueListaComponent.enviarParaRelatorio();

    this.cdRef.detectChanges();
    this.estoqueService.imprimirRelatorio('print-section');

    this.cdRef.detectChanges();
  }

  onDelete(estoque: Estoque) {
    const dialogRef = this.dialog.open(RemoverEstoqueDialogComponent, {
      width: '300px',
      data: { estoque: estoque },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.estoqueService
          .removerQuantidadeEstoque(estoque._id, result)
          .subscribe(
            () => {
              this._snackBar.open(
                'Quantidade removida com sucesso!',
                'Fechar',
                { duration: 3000 }
              );
              this.atualizar();
            },
            (error) => {
              this.onError('Erro ao remover quantidade.');
            }
          );
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
