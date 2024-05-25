import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatFormField, MatLabel],
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  ngOnInit(): void {

  }
  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
