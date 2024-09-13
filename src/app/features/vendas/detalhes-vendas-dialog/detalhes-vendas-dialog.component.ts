import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-detalhes-vendas-dialog',
  templateUrl: './detalhes-vendas-dialog.component.html',
  styleUrls: ['./detalhes-vendas-dialog.component.scss'],
  standalone: true,
  imports:[MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatFormField, MatLabel]
})
export class DetalhesVendasDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<DetalhesVendasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

