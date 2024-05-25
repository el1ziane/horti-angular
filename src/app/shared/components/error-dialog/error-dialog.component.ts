import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss',

})
export class ErrorDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit(): void {

  }

}
