import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    DatePipe,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
