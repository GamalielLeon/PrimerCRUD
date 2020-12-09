import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CatalogsDataService } from '../../services/catalogs-data.service';

@Component({
  selector: 'app-catalog-countries',
  templateUrl: './catalog-countries.component.html',
  styleUrls: ['./catalog-countries.component.css']
})
export class CatalogCountriesComponent implements OnInit {
  cities: string[] = ['city 1', 'city 2', 'city 3'];
  private bandAddCity: boolean = false;
  formCity: FormGroup;

  constructor( private catalogsDataService: CatalogsDataService, private formBuilder: FormBuilder ) {
    this.formCity = this.formBuilder.group({
      cityName: ['']
    });
  }

  ngOnInit(): void {
  }

  // Methods
  checkSubmit(): void{
    console.log(this.formCity);
    this.addCity();
    this.setBandAddCity(false);
  }

  addCity(): void{
    console.log('add city');
    this.catalogsDataService.createCity({name: this.formCity.value.cityName}).subscribe( (resp: any) => { console.log(resp); } );
  }

  editCity(index: number): void{
    console.log(index + 'edit');
  }

  deleteCity(index: number): void{
    console.log(index + 'del');
  }

  // Setters
  setBandAddCity(addCity: boolean): void{ this.bandAddCity = addCity; }

  // Getters
  getBandAddCity = (): boolean => this.bandAddCity;
}
