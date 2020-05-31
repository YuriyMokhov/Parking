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
import { MatCardModule } from '@angular/material/card';
import { NZ_I18N, ru_RU } from 'ng-zorro-antd/i18n';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { PageNotFoundComponent } from '@componentes/page-not-found/page-not-found.component';


@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, HttpClientJsonpModule,
        NzListModule, NzTableModule, MatIconModule, BrowserAnimationsModule, MatTableModule, MatCardModule,
        AppRoutingModule],
    declarations: [AppComponent, ResultTableComponent, PageNotFoundComponent],
    bootstrap: [AppComponent],
    providers: [
        { provide: LOCALE_ID, useValue: "ru-RU" }, { provide: NZ_I18N, useValue: ru_RU },
        CookieService
        //otherProviders...
    ]
})
export class AppModule { }