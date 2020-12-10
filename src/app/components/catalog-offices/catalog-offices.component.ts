import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-catalog-offices',
  templateUrl: './catalog-offices.component.html',
  styleUrls: ['./catalog-offices.component.css']
})
export class CatalogOfficesComponent implements OnInit {
  offices = [
    {name: 'office 1', phoneNumber: 11111111, address: 'Av 1 no 01, zip code 11111'},
    {name: 'office 2', phoneNumber: 22222222, address: 'Av 2 no 02, zip code 22222'},
    {name: 'office 3', phoneNumber: 33333333, address: 'Av 3 no 03, zip code 22222'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Methods
  addOffice(): void{
    console.log('add office');
  }

  editOffice(index: number): void{
    console.log(index + 'edit');
  }

  deleteOffice(index: number): void{
    console.log(index + 'del');
  }

  // Setters

  // Getters

}
