import { ResultTableComponent } from "@componentes/result-table/result-table.component"

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "@componentes/app/app.component"
import { PageNotFoundComponent } from "./componentes/page-not-found/page-not-found.component";

const routes: Routes = [
    { path: 'group/:screenName', component: ResultTableComponent },
    { path: '**', component: PageNotFoundComponent }

]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }