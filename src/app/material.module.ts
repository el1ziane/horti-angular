import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatSlideToggleModule,
        MatSnackBarModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatSlideToggleModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatSnackBarModule


    ]
})

export class  MaterialModule {}
