import 'zone.js';

import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/auth.interceptor';
//import { MY_DATE_FORMATS } from './app/features/compra/form/form-compra/form-compra.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
      provideAnimations(),
      provideHttpClient(),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
      importProvidersFrom(MatNativeDateModule),
        importProvidersFrom(BrowserModule, AppRoutingModule, ReactiveFormsModule, MatMenuModule, MatTableModule, MatFormFieldModule, MatSelectModule, FormsModule, MatButtonModule, MatInputModule, MatAutocompleteModule, MatDatepickerModule, FontAwesomeModule, MatDatepickerModule, MatButtonModule, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatSlideToggleModule, MatSnackBarModule),
       // { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
          { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },

       // provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
