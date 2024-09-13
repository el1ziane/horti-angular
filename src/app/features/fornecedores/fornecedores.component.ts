import { Fornecedor } from './../../model/fornecedor';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable, BehaviorSubject, catchError, of, combineLatest, startWith, map } from 'rxjs';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { NgIf, AsyncPipe, NgStyle, NgForOf } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatToolbar } from '@angular/material/toolbar';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FornecedoresService } from '../../services/fornecedores.service';
import { FornecedorListaComponent } from './fornecedor-lista/fornecedor-lista.component';
import { NgxPrintService } from 'ngx-print';

@Component({
  selector: 'app-fornecedores',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatToolbar, MatButton, MatIcon, ReactiveFormsModule, FormsModule, FaIconComponent, NgIf, FornecedorListaComponent, MatProgressSpinner, AsyncPipe, NgStyle, NgForOf],
  templateUrl: './fornecedores.component.html',
  styleUrl: './fornecedores.component.scss'
})
export class FornecedoresComponent implements OnInit {


  fornecedor$: Observable<Fornecedor[]> | null = null;
  filteredFornecedores$: Observable<Fornecedor[]> | null = null;
  searchTerm$ = new BehaviorSubject<string>('');
  faSearch = faSearch;
  searchTerm = '';
  showPrintSection: boolean = false;
  @ViewChild(FornecedorListaComponent) fornecedorListaComponent!:FornecedorListaComponent

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
      catchError(error => {
        this.onError('Erro ao carregar forncedores.');
        return of([])
      })
    );

    this.filteredFornecedores$ = combineLatest([
      this.fornecedor$,
      this.searchTerm$.pipe(startWith(''))
    ]).pipe(
      map(([fornecedor, searchTerm]) =>
        fornecedor.filter(fornecedor =>
          (fornecedor.fornecedorNome && fornecedor.fornecedorNome.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (fornecedor.cnpj && fornecedor.cnpj.toString().includes(searchTerm.toLowerCase()))
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
    this.router.navigate(['novo'], {relativeTo: this.route});
  }

  onEdit(fornecedor: Fornecedor){
    this.router.navigate(['editar', fornecedor._id], {relativeTo: this.route});
  }
  onDelete(fornecedor: Fornecedor){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse item?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
     if (result) {
      this.fornecedoresService.excluir(fornecedor._id).subscribe(
        () =>{

          this._snackBar.open("Fornecedor removido com sucesso!", 'X',{duration:3000, verticalPosition:'bottom', horizontalPosition:'center'});


          this.atualizar();
        },
        (error) => this.onError('Erro ao tentar remover fornecedor')
      );
     }
    });

  }

    search(e: Event): void {
      const target = e.target as HTMLInputElement;
      this.searchTerm$.next(target.value);
    }


}
