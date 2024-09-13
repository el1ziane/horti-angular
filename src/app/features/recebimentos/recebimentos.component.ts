import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, startWith } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Recebimento } from '../../model/recebimento';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RecebimentosListaComponent } from './recebimentos-lista/recebimentos-lista.component';
import { NgIf, AsyncPipe, NgStyle, NgForOf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { RecebimentosService } from '../../services/recebimentos.service';
import { NgxPrintService } from 'ngx-print';

@Component({
    selector: 'app-recebimentos',
    templateUrl: './recebimentos.component.html',
    styleUrls: ['./recebimentos.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatToolbar, MatButton, MatIcon, ReactiveFormsModule, FormsModule, FaIconComponent, NgIf, RecebimentosListaComponent, MatProgressSpinner, AsyncPipe, NgStyle, NgForOf ]
})
export class RecebimentosComponent implements OnInit {

  recebimentos$: Observable<Recebimento[]> | null = null;
  filteredRecebimentos$: Observable<Recebimento[]> | null = null;
  searchTerm$ = new BehaviorSubject<string>('');
  faSearch = faSearch;
  searchTerm = '';
  showPrintSection: boolean = false;
  @ViewChild(RecebimentosListaComponent) recebimentosListaComponent!:RecebimentosListaComponent
  constructor(
    public recebimentosService: RecebimentosService,
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
    this.recebimentos$ = this.recebimentosService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar recebimentos.');
        return of([])
      })
    );

    this.filteredRecebimentos$ = combineLatest([
      this.recebimentos$,
      this.searchTerm$.pipe(startWith(''))
    ]).pipe(
      map(([recebimentos, searchTerm]) =>
        recebimentos.filter(recebimento =>
          (recebimento.fornecedorRec && recebimento.fornecedorRec.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (recebimento.produto && recebimento.produto.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (recebimento.status && recebimento.status.toLowerCase().includes(searchTerm.toLowerCase()))

        )
      )
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }

  onReport(): void {
      this.recebimentosListaComponent;
          this.recebimentosListaComponent.enviarParaRelatorio();
          this.cdRef.detectChanges();
              this.recebimentosService.imprimirRelatorio('print-section');
              this.cdRef.detectChanges();
  }
  onAdd() {
    this.router.navigate(['novo'], {relativeTo: this.route});
  }

  onEdit(recebimeto: Recebimento){
    this.router.navigate(['editar', recebimeto._id], {relativeTo: this.route});
  }
  onDelete(recebimento: Recebimento){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse item?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
     if (result) {
      this.recebimentosService.excluir(recebimento._id).subscribe(
        () =>{

          this._snackBar.open("Recebimento removido com sucesso!", 'X',{duration:3000, verticalPosition:'bottom', horizontalPosition:'center'});


          this.atualizar();
        },
        (error) => this.onError('Erro ao tentar remover recebimento')
      );
     }
    });

  }

    search(e: Event): void {
      const target = e.target as HTMLInputElement;
      this.searchTerm$.next(target.value);
    }

}
