import { AsyncPipe, NgForOf, NgIf, NgStyle } from '@angular/common';
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
import { NgxPrintService } from 'ngx-print';
import { catchError, Observable, of } from 'rxjs';

import { FornecedoresService } from '../../services/fornecedores.service';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Fornecedor } from './../../model/fornecedor';
import { FornecedorListaComponent } from './fornecedor-lista/fornecedor-lista.component';

@Component({
  selector: 'app-fornecedores',
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
    NgIf,
    FornecedorListaComponent,
    MatProgressSpinner,
    AsyncPipe,
    NgStyle,
    NgForOf,
  ],
  templateUrl: './fornecedores.component.html',
  styleUrl: './fornecedores.component.scss',
})
export class FornecedoresComponent implements OnInit {
  fornecedor$: Observable<Fornecedor[]> | null = null;
  showPrintSection: boolean = false;
  dataSource: MatTableDataSource<Fornecedor> =
    new MatTableDataSource<Fornecedor>();
  @ViewChild(FornecedorListaComponent)
  fornecedorListaComponent!: FornecedorListaComponent;
  @ViewChild(MatPaginator, { read: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(
    public fornecedoresService: FornecedoresService,
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
    this.fornecedor$ = this.fornecedoresService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar fornecedores.');
        return of([]);
      })
    );

    this.fornecedor$.subscribe((fornecedor) => {
      this.dataSource.data = fornecedor;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {}
  onReport(): void {
    //  console.log(this.produtosListaComponent);
    if (this.fornecedorListaComponent) {
      this.fornecedorListaComponent.enviarParaRelatorio();

      this.cdRef.detectChanges();
      this.fornecedoresService.imprimirRelatorio('print-section');

      this.cdRef.detectChanges();
    } else {
      console.error('ProdutosListaComponent não foi inicializado.');
    }
  }
  onAdd() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  onEdit(fornecedor: Fornecedor) {
    this.router.navigate(['editar', fornecedor._id], {
      relativeTo: this.route,
    });
  }
  onDelete(fornecedor: Fornecedor) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse item?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.fornecedoresService.excluir(fornecedor._id).subscribe(
          () => {
            this._snackBar.open('Fornecedor removido com sucesso!', 'X', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
            });

            this.atualizar();
          },
          (error) => this.onError('Erro ao tentar remover fornecedor')
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
