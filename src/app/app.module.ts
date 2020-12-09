import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CatalogEmployeesComponent } from './components/catalog-employees/catalog-employees.component';
import { CatalogCountriesComponent } from './components/catalog-countries/catalog-countries.component';
import { CatalogOfficesComponent } from './components/catalog-offices/catalog-offices.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogEmployeesComponent,
    CatalogCountriesComponent,
    CatalogOfficesComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
