import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogEmployeesComponent } from './components/catalog-employees/catalog-employees.component';
import { CatalogCountriesComponent } from './components/catalog-countries/catalog-countries.component';
import { CatalogOfficesComponent } from './components/catalog-offices/catalog-offices.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogEmployeesComponent,
    CatalogCountriesComponent,
    CatalogOfficesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
