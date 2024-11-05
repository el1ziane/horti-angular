import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-remover-estoque-dialog',
  imports: [MatFormField, MatLabel, FormsModule, MatInputModule,MatDialogActions, MatDialogClose, MatButtonModule,MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatFormField, MatLabel],
  standalone: true,
  template: `
    <mat-dialog-content>
      <p>Digite a quantidade a ser removida para {{ data.estoque.produtoEstoque.produtoNome }}:</p>
      <mat-form-field appearance="outline" align="center">
        <mat-label>Quantidade</mat-label>
        <input matInput [(ngModel)]="quantidadeEstoque" type="number" min="1">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="center">
      <button mat-raised-button (click)="onCancel()"style="color: #D66767">Cancelar</button>
      <button mat-raised-button [disabled]="!quantidadeEstoque || quantidadeEstoque <= 0" (click)="onConfirm()" style="color: #64C2A8">OK</button>
      </mat-dialog-actions>
  `,
})
export class RemoverEstoqueDialogComponent {
  quantidadeEstoque: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<RemoverEstoqueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(this.quantidadeEstoque);
  }
}
