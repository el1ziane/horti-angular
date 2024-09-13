import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable, BehaviorSubject, catchError, of, combineLatest, startWith, map } from 'rxjs';
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


@Component({
  selector: 'app-producao',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatToolbar, MatButton, MatIcon, ReactiveFormsModule, FormsModule, FaIconComponent, NgIf, ProducaoListaComponent, MatProgressSpinner, AsyncPipe, NgStyle, NgForOf],
  templateUrl: './producao.component.html',
  styleUrl: './producao.component.scss'
})
export class ProducaoComponent implements OnInit {


  producoes$: Observable<Producao[]> | null = null;
  filteredProducoes$: Observable<Producao[]> | null = null;
  searchTerm$ = new BehaviorSubject<string>('');
  faSearch = faSearch;
  searchTerm = '';
  showPrintSection: boolean = false;
  @ViewChild(ProducaoListaComponent) producaoListaComponent!:ProducaoListaComponent

  constructor(
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
    this.producoes$ = this.producaoService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar lista.');
        return of([])
      })
    );

    this.filteredProducoes$ = combineLatest([
      this.producoes$,
      this.searchTerm$.pipe(startWith(''))
    ]).pipe(
      map(([producoes, searchTerm]) =>
        producoes.filter(producao =>
          (producao.produtoProducao && producao.produtoProducao.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (producao.codigoProducao && producao.codigoProducao.toString().includes(searchTerm.toLowerCase()))
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
    //  console.log(this.produtosListaComponent);
      this.producaoListaComponent;

          this.producaoListaComponent.enviarParaRelatorio();

          this.cdRef.detectChanges();
              this.producaoService.imprimirRelatorio('print-section');

              this.cdRef.detectChanges();
      }

  onAdd() {
    this.router.navigate(['novo'], {relativeTo: this.route});
  }

  onEdit(producao: Producao){
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

    search(e: Event): void {
      const target = e.target as HTMLInputElement;
      this.searchTerm$.next(target.value);
    }

}
