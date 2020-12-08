import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { CatalogEmployeesComponent } from './components/catalog-employees/catalog-employees.component';
import { CatalogOfficesComponent } from './components/catalog-offices/catalog-offices.component';
import { CatalogCountriesComponent } from './components/catalog-countries/catalog-countries.component';

const routes: Routes = [
  {path: 'home', component: NavigationBarComponent},
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
