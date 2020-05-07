import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '@componentes/app/app.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NzListModule } from 'ng-zorro-antd/list';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu, "ru-RU");
import { NzTableModule } from 'ng-zorro-antd/table';
import { ResultTableComponent } from '@componentes/result-table/result-table.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, HttpClientJsonpModule,
        NzListModule, NzTableModule, MatIconModule, BrowserAnimationsModule, MatTableModule],
    declarations: [AppComponent, ResultTableComponent],
    bootstrap: [AppComponent],
    providers: [
        { provide: LOCALE_ID, useValue: "ru-RU" }
        //otherProviders...
    ]
})
export class AppModule { }