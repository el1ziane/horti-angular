import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'zone.js';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppDateAdapter } from './app/app-data';

import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MY_DATE_FORMATS } from './app/features/recebimentos/form-recebimento/form-recebimento.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, ReactiveFormsModule, MatMenuModule, MatTableModule, MatFormFieldModule, MatSelectModule, FormsModule, MatButtonModule, MatInputModule, MatAutocompleteModule, MatDatepickerModule, FontAwesomeModule, MatDatepickerModule, MatButtonModule, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatSlideToggleModule, MatSnackBarModule),
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
        { provide: DateAdapter, useClass: AppDateAdapter },
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
