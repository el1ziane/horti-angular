import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, startWith } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgIf, AsyncPipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
    selector: 'app-vendas',
    templateUrl: './vendas.component.html',
    styleUrls: ['./vendas.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatToolbar, MatButton, MatIcon, ReactiveFormsModule, FormsModule, FaIconComponent, NgIf, VendasListaComponent, MatProgressSpinner, AsyncPipe]
})
export class VendasComponent implements OnInit {

  vendas$: Observable<Venda[]> | null = null;
  filteredVenda$: Observable<Venda[]> | null = null;
  searchTerm$ = new BehaviorSubject<string>('');
  faSearch = faSearch;
  searchTerm = '';

  constructor(
    private vendasService: VendasService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.atualizar();
  }

  atualizar() {
    this.vendas$ = this.vendasService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar vendas.');
        return of([])
      })
    );

    this.filteredVendas$ = combineLatest([
      this.vendas$,
      this.searchTerm$.pipe(startWith(''))
    ]).pipe(
      map(([vendas, searchTerm]) =>
        vendas.filter(venda =>
          (venda.produtovenda && venda.produtoVenda.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (venda.periodo && venda.periodo.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (venda.statusVenda && venda.statusVenda.toLowerCase().includes(searchTerm.toLowerCase()))

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
  onAdd() {
    this.router.navigate(['novo'], {relativeTo: this.route});
  }

  onEdit(venda: Venda){
    this.router.navigate(['editar', venda._id], {relativeTo: this.route});
  }
  onDelete(venda: Venda){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse item?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
     if (result) {
      this.vendasService.excluir(venda._id).subscribe(
        () =>{

          this._snackBar.open("Venda removida com sucesso!", 'X',{duration:3000, verticalPosition:'bottom', horizontalPosition:'center'});


          this.atualizar();
        },
        (error) => this.onError('Erro ao tentar remover venda')
      );
     }
    });

  }

    search(e: Event): void {
      const target = e.target as HTMLInputElement;
      this.searchTerm$.next(target.value);
    }

}
