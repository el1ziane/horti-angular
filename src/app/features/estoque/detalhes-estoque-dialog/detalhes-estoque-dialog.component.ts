import { DecimalPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';

@Component({
  selector: 'app-detalhes-estoque-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatFormField, MatLabel,DecimalPipe, DecimalVirgulaPipe],
  templateUrl: './detalhes-estoque-dialog.component.html',
  styleUrl: './detalhes-estoque-dialog.component.scss'
})
export class DetalhesEstoqueDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<DetalhesEstoqueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
