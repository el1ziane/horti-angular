import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { RecebimentosService } from '../../services/recebimentos.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Recebimento } from '../../model/recebimento';


@Component({
  selector: 'app-recebimentos',
  templateUrl: './recebimentos.component.html',
  styleUrls: ['./recebimentos.component.scss']
})
export class RecebimentosComponent implements OnInit {

  recebimentos$: Observable<Recebimento[]> | null = null;
//recebimentosService: RecebimentosService;

  constructor(private recebimentosService: RecebimentosService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
    //this.recebimentosService = new RecebimentosService();
   this.atualizar();
  }
  atualizar(){
    this.recebimentos$ = this.recebimentosService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar recebimentos.');
       return of([])
      })
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
    console.log('add on');
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
}
