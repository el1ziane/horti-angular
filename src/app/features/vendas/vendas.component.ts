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
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";


@Component({
    selector: 'app-vendas',
    templateUrl: './vendas.component.html',
    styleUrls: ['./vendas.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatToolbar, MatButton, MatIcon, ReactiveFormsModule, FormsModule, FaIconComponent, NgIf, VendasComponent, MatProgressSpinner, AsyncPipe, VendasListaComponent, NgxPrintModule,NgStyle, CommonModule, NgForOf]
})
export class VendasComponent implements OnInit {

  venda$: Observable<Venda[]> | null = null;
  dataSource: MatTableDataSource<Venda> = new MatTableDataSource<Venda>();
  @ViewChild(VendasListaComponent) vendasListaComponent!:VendasListaComponent
  @ViewChild(MatPaginator, { read: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public vendasService: VendasService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) {
    this.atualizar();
  }
  showPrintSection: boolean = false;

  atualizar() {
    this.venda$ = this.vendasService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar vendas.');
        return of([]);
      })
    );

    this.venda$.subscribe(venda => {
      this.dataSource.data = venda;
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
