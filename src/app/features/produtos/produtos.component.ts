import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable, BehaviorSubject, catchError, of, combineLatest, startWith, map } from 'rxjs';
import { Produto } from '../../model/produto';
import { ProdutosService } from '../../services/produtos.service';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { MatToolbar } from '@angular/material/toolbar';
import { NgIf, AsyncPipe, NgStyle, CommonModule, NgForOf } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ProdutosListaComponent } from './produtos-lista/produtos-lista.component';
import { NgxPrintModule, NgxPrintService } from 'ngx-print';



@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatToolbar, MatButton, MatIcon, ReactiveFormsModule, FormsModule, FaIconComponent, NgIf, ProdutosListaComponent, MatProgressSpinner, AsyncPipe,NgxPrintModule,NgStyle, CommonModule, NgForOf],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent implements OnInit {


  produtos$: Observable<Produto[]> | null = null;
  filteredProdutos$: Observable<Produto[]> | null = null;
  searchTerm$ = new BehaviorSubject<string>('');
  faSearch = faSearch;
  searchTerm = '';

  @ViewChild(ProdutosListaComponent) produtosListaComponent!:ProdutosListaComponent
  constructor(
    public produtosService: ProdutosService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,

    private printService: NgxPrintService,

    private cdRef: ChangeDetectorRef
  ) {
    this.atualizar();

  }
  showPrintSection: boolean = false;

  atualizar() {
    this.produtos$ = this.produtosService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar produtos.');
        return of([])
      })
    );

    this.filteredProdutos$ = combineLatest([
      this.produtos$,
      this.searchTerm$.pipe(startWith(''))
    ]).pipe(
      map(([produtos, searchTerm]) =>
        produtos.filter(produto =>
          (produto.produtoNome && produto.produtoNome.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (produto.valorProduto && produto.valorProduto.toString().includes(searchTerm.toLowerCase()))
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
  onReport(): void {
  //  console.log(this.produtosListaComponent);
    if (this.produtosListaComponent) {

        this.produtosListaComponent.enviarParaRelatorio();

        this.cdRef.detectChanges();
            this.produtosService.imprimirRelatorio('print-section');

            this.cdRef.detectChanges();
    } else {
        console.error('ProdutosListaComponent não foi inicializado.');
    }
}

  onEdit(produto: Produto){
    this.router.navigate(['editar', produto._id], {relativeTo: this.route});
  }
  onDelete(produto: Produto){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse item?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
     if (result) {
      this.produtosService.excluir(produto._id).subscribe(
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
