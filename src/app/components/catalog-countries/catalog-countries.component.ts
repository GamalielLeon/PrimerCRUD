import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog-countries',
  templateUrl: './catalog-countries.component.html',
  styleUrls: ['./catalog-countries.component.css']
})
export class CatalogCountriesComponent implements OnInit {
  cities: string[] = ['city 1', 'city 2', 'city 3'];

  constructor() { }

  ngOnInit(): void {
  }

  // Methods
  addCity(): void{
    console.log('add city');
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
