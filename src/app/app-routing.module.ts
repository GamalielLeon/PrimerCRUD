import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogEmployeesComponent } from './components/catalog-employees/catalog-employees.component';
import { CatalogOfficesComponent } from './components/catalog-offices/catalog-offices.component';
import { CatalogCountriesComponent } from './components/catalog-countries/catalog-countries.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: 'employees', component: CatalogEmployeesComponent},
  {path: 'offices', component: CatalogOfficesComponent},
  {path: 'cities', component: CatalogCountriesComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
