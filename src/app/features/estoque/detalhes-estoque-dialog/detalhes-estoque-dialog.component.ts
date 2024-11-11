import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { DecimalVirgulaPipe } from '../../../shared/decimal-virgula.pipe';

@Component({
  selector: 'app-detalhes-estoque-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, DecimalVirgulaPipe],
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
