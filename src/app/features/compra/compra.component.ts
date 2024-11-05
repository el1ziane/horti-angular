import { Despesa } from '../../model/despesa';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Compra} from '../../model/compra';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CompraListaComponent } from './compra-lista/compra-lista.component';
import { NgIf, AsyncPipe, NgStyle, NgForOf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { CompraService } from '../../services/compra.service';
import { NgxPrintService } from 'ngx-print';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DespesaListaComponent } from './despesa-lista/despesa-lista.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DespesaService } from '../../services/despesa.service';

@Component({
    selector: 'app-compra',
    templateUrl: './compra.component.html',
    styleUrls: ['./compra.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatToolbar, MatButton, MatIcon, ReactiveFormsModule, FormsModule, FaIconComponent, NgIf, CompraListaComponent,DespesaListaComponent, MatProgressSpinner, AsyncPipe, NgStyle, NgForOf,MatTabsModule ]
})
export class CompraComponent implements OnInit {
  selectedIndex: number = 0; // Índice da aba ativa
  compras$: Observable<Compra[]> | null = null;
  despesas$: Observable<Despesa[]> | null = null;
  compraDataSource: MatTableDataSource<Compra> = new MatTableDataSource<Compra>();
  despesaDataSource: MatTableDataSource<Despesa> = new MatTableDataSource<Despesa>();
  @ViewChild(CompraListaComponent) compraListaComponent!:CompraListaComponent
  @ViewChild(DespesaListaComponent) despesaListaComponent!:DespesaListaComponent
  @ViewChild(MatPaginator, { read: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public compraService: CompraService,
    public despesaService: DespesaService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private printService: NgxPrintService,
    private cdRef: ChangeDetectorRef
  ) {
    this.atualizarCompras();
    this.atualizarDespesas();
  }

  atualizarCompras() {
    this.compras$ = this.compraService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar compras.');
        return of([]);
      })
    );

    this.compras$.subscribe(compras => {
      this.compraDataSource.data = compras;
      if (this.paginator) {
        this.compraDataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.compraDataSource.sort = this.sort;
      }
    });
  }

  // Função para atualizar Despesas
  atualizarDespesas() {
    this.despesas$ = this.despesaService.listDespesa().pipe(
      catchError(error => {
        this.onError('Erro ao carregar despesas.');
        return of([]);
      })
    );

    this.despesas$.subscribe(despesas => {
      this.despesaDataSource.data = despesas;
      if (this.paginator) {
        this.despesaDataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.despesaDataSource.sort = this.sort;
      }
    });
  }
  onTabChange(event: any) {
    this.selectedIndex = event.index; // Atualiza o índice quando a aba muda
  }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }
  onAdd() {
    if (this.selectedIndex === 0) {
      this.router.navigate(['novo'], {relativeTo: this.route});
    } else if (this.selectedIndex === 1) {
      this.router.navigate(['nova'], {relativeTo: this.route});
    }
  }


  onReport() {
    if (this.selectedIndex === 0) {
      this.compraListaComponent;
      this.compraListaComponent.enviarParaRelatorio();
      this.cdRef.detectChanges();
          this.compraService.imprimirRelatorio('print-section');
          this.cdRef.detectChanges();
    } else if (this.selectedIndex === 1) {
      this.compraListaComponent;
      this.despesaListaComponent.enviarParaRelatorio();
      this.cdRef.detectChanges();
          this.despesaService.imprimirRelatorio('print-section');
          this.cdRef.detectChanges();
    }
  }


  onEdit(item: Compra | Despesa, tipo: 'compra' | 'despesa') {
    console.log('Tipo:', tipo);
    console.log('ID:', item._id);
    if (tipo === 'compra') {
        this.router.navigate(['editar-compra', (item as Compra)._id], { relativeTo: this.route });
    } else if (tipo === 'despesa') {
        this.router.navigate(['editar-despesa', (item as Despesa)._id], { relativeTo: this.route });
    }
}


  onDelete(item: Compra | Despesa, tipo: 'compra' | 'despesa') {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse item?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        if (tipo === 'compra') {
          this.compraService.excluir((item as Compra)._id).subscribe(
            () => {
              this._snackBar.open("Compra removida com sucesso!", 'X', { duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'center' });
              this.atualizarCompras(); // Atualiza a lista de compras
            },
            (error) => this.onError('Erro ao tentar remover Compra')
          );
        } else if (tipo === 'despesa') {
          this.despesaService.excluir((item as Despesa)._id).subscribe(
            () => {
              this._snackBar.open("Despesa removida com sucesso!", 'X', { duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'center' });
              this.atualizarDespesas(); // Atualiza a lista de despesas
            },
            (error) => this.onError('Erro ao tentar remover Despesa')
          );
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (filterValue) {

      this.compraDataSource.filter = filterValue;

      this.despesaDataSource.filter = filterValue;
    } else {

      this.compraDataSource.filter = '';
      this.despesaDataSource.filter = '';
    }
  }


}
