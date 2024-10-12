import { ChangeDetectorRef, Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { Estoque } from '../../model/estoque';
import { NgIf, AsyncPipe, NgStyle, NgForOf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, ActivatedRoute } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgxPrintService } from 'ngx-print';
import { catchError, Observable, of, tap } from 'rxjs';
import { Producao } from '../../model/producao';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { EstoqueListaComponent } from './estoque-lista/estoque-lista.component';
import { EstoqueService } from '../../services/estoque.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProducaoService } from '../../services/producao.service';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatToolbar, MatButton, MatIcon, ReactiveFormsModule, FormsModule, FaIconComponent, NgIf, EstoqueListaComponent, MatProgressSpinner, AsyncPipe, NgStyle, NgForOf, CommonModule],
 
  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.scss'
})
export class EstoqueComponent implements OnInit {
  estoque: Estoque[] = [];
  estoque$: Observable<Estoque[]> | null = null;
  dataSource: MatTableDataSource<Estoque> = new MatTableDataSource<Estoque>();
  @ViewChild(EstoqueListaComponent) estoqueListaComponent!:EstoqueListaComponent
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
      tap(estoque => {
        console.log('Dados do estoque:', estoque);
        this.dataSource.data = estoque;
      }),
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
    this.estoqueService.list().subscribe((estoque) => {
      this.estoque = estoque;
    });
    this.atualizar();
  }


  onReport(): void {
    //  console.log(this.produtosListaComponent);
      this.estoqueListaComponent;

          this.estoqueListaComponent.enviarParaRelatorio();

          this.cdRef.detectChanges();
              this.estoqueService.imprimirRelatorio('print-section');

              this.cdRef.detectChanges();
      }

  onDelete(producao: Producao){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse item?',
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
