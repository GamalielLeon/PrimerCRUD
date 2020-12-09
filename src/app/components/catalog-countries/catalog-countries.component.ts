import { Component, OnInit } from '@angular/core';
import { CatalogsDataService } from '../../services/catalogs-data.service';

@Component({
  selector: 'app-catalog-countries',
  templateUrl: './catalog-countries.component.html',
  styleUrls: ['./catalog-countries.component.css']
})
export class CatalogCountriesComponent implements OnInit {
  cities: string[] = ['city 1', 'city 2', 'city 3'];

  constructor( private catalogsDataService: CatalogsDataService ) { }

  ngOnInit(): void {
  }

  // Methods
  addCity(): void{
    console.log('add city');
    this.catalogsDataService.createCity({name: 'city 1'}).subscribe( (resp: any) => { console.log(resp); } );
  }

  editCity(index: number): void{
    console.log(index + 'edit');
  }

  deleteCity(index: number): void{
    console.log(index + 'del');
  }

  // Setters

  // Getters
}
