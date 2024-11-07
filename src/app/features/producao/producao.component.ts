import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { MatToolbar } from '@angular/material/toolbar';
import { NgIf, AsyncPipe, NgStyle, NgForOf } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ProducaoListaComponent } from './producao-lista/producao-lista.component';
import { Producao } from '../../model/producao';
import { ProducaoService } from '../../services/producao.service';
import { NgxPrintService } from 'ngx-print';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EstoqueService } from '../../services/estoque.service';


@Component({
  selector: 'app-producao',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatToolbar, MatButton, MatIcon, ReactiveFormsModule, FormsModule, FaIconComponent, NgIf, ProducaoListaComponent, MatProgressSpinner, AsyncPipe, NgStyle, NgForOf],
  templateUrl: './producao.component.html',
  styleUrl: './producao.component.scss'
})
export class ProducaoComponent implements OnInit {


  producao$: Observable<Producao[]> | null = null;
  showPrintSection: boolean = false;
  dataSource: MatTableDataSource<Producao> = new MatTableDataSource<Producao>();
  @ViewChild(ProducaoListaComponent) producaoListaComponent!:ProducaoListaComponent
  @ViewChild(MatPaginator, { read: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    public producaoService: ProducaoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private printService: NgxPrintService,
    private cdRef: ChangeDetectorRef,
    private estoqueService: EstoqueService
  ) {
    this.atualizar();
  }

  atualizar() {
    this.producao$ = this.producaoService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar produtos.');
        return of([]);
      })
    );

    this.producao$.subscribe(producao => {
      this.dataSource.data = producao;
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
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }

  onReport(): void {
      this.producaoListaComponent;

          this.producaoListaComponent.enviarParaRelatorio();

          this.cdRef.detectChanges();
              this.producaoService.imprimirRelatorio('print-section');

              this.cdRef.detectChanges();
      }

  onAdd() {
    this.router.navigate(['novo'], {relativeTo: this.route});
  }

    onEdit(producao: Producao) {
      this.router.navigate(['editar', producao._id], {relativeTo: this.route});
    }

  onDelete(producao: Producao){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse item?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
     if (result) {
      this.producaoService.excluir(producao._id).subscribe(
        () =>{

          this._snackBar.open("Produto removido com sucesso!", 'X',{duration:3000, verticalPosition:'bottom', horizontalPosition:'center'});


          this.atualizar();
        },
        (error) => this.onError('Erro ao tentar remover produto')
      );
     }
    });

  }
  onSuccess() {
    this._snackBar.open('Produção salva com sucesso!', 'X', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
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
