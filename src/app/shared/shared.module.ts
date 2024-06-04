import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MaterialModule } from '../material.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { AppModule } from '../app.module';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ErrorDialogComponent,
    //MaterialModule,
    ConfirmationDialogComponent,
    AppModule

  ],
  exports: [ErrorDialogComponent, ConfirmationDialogComponent]
})
export class SharedModule { }
