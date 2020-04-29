import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '@componentes/app/app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }