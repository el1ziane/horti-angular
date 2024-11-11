import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';

@Component({
  selector: 'app-detalhes-produtos-dialog',
  templateUrl: './detalhes-produtos-dialog.component.html',
  styleUrls: ['./detalhes-produtos-dialog.component.scss'],
  standalone: true,
  imports:[MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, DecimalVirgulaPipe]
})
export class DetalhesProdutosDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DetalhesProdutosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}

