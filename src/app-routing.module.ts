import { ResultTableComponent } from "@componentes/result-table/result-table.component"

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "@componentes/app/app.component"

const routes: Routes = [
    { path: ':screenName', component: ResultTableComponent },
    //need to add not found page path:'**'

]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }