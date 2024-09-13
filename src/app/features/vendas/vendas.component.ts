import { NgIf, AsyncPipe, NgStyle, CommonModule, NgForOf } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatToolbar } from "@angular/material/toolbar";
import { Router, ActivatedRoute } from "@angular/router";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Observable, BehaviorSubject, catchError, of, combineLatest, startWith, map } from "rxjs";
import { Venda } from "../../model/venda";
import { VendasService } from "../../services/vendas.service";
import { ConfirmationDialogComponent } from "../../shared/components/confirmation-dialog/confirmation-dialog.component";
import { ErrorDialogComponent } from "../../shared/components/error-dialog/error-dialog.component";
import { VendasListaComponent } from "./vendas-lista/vendas-lista.component";
import { NgxPrintModule, NgxPrintService } from "ngx-print";


@Component({
    selector: 'app-vendas',
    templateUrl: './vendas.component.html',
    styleUrls: ['./vendas.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatToolbar, MatButton, MatIcon, ReactiveFormsModule, FormsModule, FaIconComponent, NgIf, VendasComponent, MatProgressSpinner, AsyncPipe, VendasListaComponent, NgxPrintModule,NgStyle, CommonModule, NgForOf]
})
export class VendasComponent implements OnInit {

  vendas$: Observable<Venda[]> | null = null;
  filteredVenda$: Observable<Venda[]> | null = null;
  searchTerm$ = new BehaviorSubject<string>('');
  faSearch = faSearch;
  searchTerm = '';
  @ViewChild(VendasListaComponent)
  vendasListaComponent!: VendasListaComponent

  constructor(
    public vendasService: VendasService,
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
    this.vendas$ = this.vendasService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar vendas.');
        return of([])
      })
    );

    this.filteredVenda$ = combineLatest([
      this.vendas$,
      this.searchTerm$.pipe(startWith(''))
    ]).pipe(
      map(([vendas, searchTerm]) =>
        vendas.filter(venda =>
          (venda.produtoVenda && venda.produtoVenda.toLowerCase().includes(searchTerm.toLowerCase())) ||

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


  onReport(): void {
    //  console.log(this.produtosListaComponent);
      if (this.vendasListaComponent) {

          this.vendasListaComponent.enviarParaRelatorio();

          this.cdRef.detectChanges();
              this.vendasService.imprimirRelatorio('print-section');

              this.cdRef.detectChanges();
      } else {

      }
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
