import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DecimalVirgulaPipe } from '../../../../shared/decimal-virgula.pipe';

@Component({
  selector: 'app-detalhes-despesa-dialog',
  templateUrl: './detalhes-despesa-dialog.component.html',
  styleUrls: ['./detalhes-despesa-dialog.component.scss'],
  standalone: true,
  imports:[MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, DecimalVirgulaPipe]
})
export class DetalhesDespesaDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<DetalhesDespesaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

