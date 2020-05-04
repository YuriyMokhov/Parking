import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '@componentes/app/app.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NzListModule } from 'ng-zorro-antd/list';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu, "ru-RU");

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, HttpClientJsonpModule, NzListModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [
        { provide: LOCALE_ID, useValue: "ru-RU" }, //replace "de-at" with your locale
        //otherProviders...
    ]
})
export class AppModule { }