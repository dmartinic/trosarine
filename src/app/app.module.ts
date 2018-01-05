import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeHr from '@angular/common/locales/hr';
import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { AutomobiliComponent } from './automobili/automobili.component';
import { MotocikliComponent } from './motocikli/motocikli.component';
import { IzracunComponent } from './izracun/izracun.component';
import { AutomobiliService } from './automobili.service';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localeHr, 'hr');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AutomobiliComponent,
    MotocikliComponent,
    IzracunComponent,
  ],
  imports: [BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MyDatePickerModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'hr' },
  AutomobiliService],
  bootstrap: [AppComponent]
})
export class AppModule { }
