import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-detalhes-fornecedores-dialog',
  templateUrl: './detalhes-fornecedores-dialog.component.html',
  styleUrls: ['./detalhes-fornecedores-dialog.component.scss'],
  standalone: true,
  imports:[MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatFormField, MatLabel]
})
export class DetalhesFornecedoresDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<DetalhesFornecedoresDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

