import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable, BehaviorSubject, catchError, of } from 'rxjs';
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
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';



@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatToolbar, MatButton, MatIcon, ReactiveFormsModule, FormsModule, FaIconComponent, NgIf, ProdutosListaComponent, MatProgressSpinner, AsyncPipe,NgxPrintModule,NgStyle, CommonModule, NgForOf, MatFormField, MatLabel,MatSortModule,MatPaginatorModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent implements OnInit {


  produtos$: Observable<Produto[]> | null = null;
//  filteredProdutos$: Observable<Produto[]> | null = null;
  searchTerm$ = new BehaviorSubject<string>('');
  faSearch = faSearch;
  searchTerm = '';
  dataSource: MatTableDataSource<Produto> = new MatTableDataSource<Produto>();
  @ViewChild(ProdutosListaComponent) produtosListaComponent!:ProdutosListaComponent
  @ViewChild(MatPaginator, { read: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
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
    //this.dataSource = new MatTableDataSource(this.produtos$);

  }
  showPrintSection: boolean = false;

  atualizar() {
    this.produtos$ = this.produtosService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar produtos.');
        return of([]); // Retorna um array vazio em caso de erro
      })
    );

    this.produtos$.subscribe(produtos => {
      this.dataSource.data = produtos;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator; // Atribuição segura
      }
      if (this.sort) {
        this.dataSource.sort = this.sort; // Atribuição segura
      }
    });
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });

  }

  ngOnInit(): void {
    this.atualizar();
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


    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

}
