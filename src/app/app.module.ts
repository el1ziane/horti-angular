import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { MaterialModule } from './material.module';
import { RecebimentosListaComponent } from './recebimentos/components/recebimentos-lista/recebimentos-lista.component';
import { FormRecebimentoComponent, MY_DATE_FORMATS, } from './recebimentos/containers/form-recebimento/form-recebimento.component';
import { RecebimentosComponent } from './recebimentos/containers/recebimentos/recebimentos.component';
import { SharedModule } from './shared/shared.module';
import { SideNavClosedComponent } from './side-nav-left/side-nav-closed/side-nav-closed.component';
import { SideNavComponent } from './side-nav-left/side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { AppDateAdapter } from './app-data';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        MatMenuModule,
        MatTableModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        FontAwesomeModule,
        MatDatepickerModule,
        MatButtonModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        SideNavClosedComponent,
        SideNavComponent,
        TopNavComponent,
        FormComponent,
        RecebimentosComponent,
        FormRecebimentoComponent,
        RecebimentosListaComponent
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
    ],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
        { provide: DateAdapter, useClass: AppDateAdapter },
        provideHttpClient(withInterceptorsFromDi())
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
