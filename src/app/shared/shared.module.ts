import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MaterialModule } from '../material.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ErrorDialogComponent,
    MaterialModule,
    ConfirmationDialogComponent

  ],
  exports: [ErrorDialogComponent, ConfirmationDialogComponent]
})
export class SharedModule { }
