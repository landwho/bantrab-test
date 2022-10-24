import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmpresaModule } from './empresa/empresa.module';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    EmpresaModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
