import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppDateAdapter } from './app-data';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { MaterialModule } from './material.module';
import { RecebimentosListaComponent } from './recebimentos/components/recebimentos-lista/recebimentos-lista.component';
import {
  FormRecebimentoComponent,
  MY_DATE_FORMATS,
} from './recebimentos/containers/form-recebimento/form-recebimento.component';
import { RecebimentosComponent } from './recebimentos/containers/recebimentos/recebimentos.component';
import { SideNavClosedComponent } from './side-nav-left/side-nav-closed/side-nav-closed.component';
import { SideNavComponent } from './side-nav-left/side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SharedModule } from './shared/shared.module';





@NgModule({
  declarations: [
    AppComponent,
    SideNavClosedComponent,
    SideNavComponent,
    TopNavComponent,
    FormComponent,
    RecebimentosComponent,
    FormRecebimentoComponent,
    RecebimentosListaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatMenuModule,
    MatTableModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    SharedModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, // Fornecer o valor de MY_DATE_FORMATS para MAT_DATE_FORMATS
    { provide: DateAdapter, useClass: AppDateAdapter }, provideAnimationsAsync() // Fornecer o AppDateAdapter como classe para DateAdapter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
