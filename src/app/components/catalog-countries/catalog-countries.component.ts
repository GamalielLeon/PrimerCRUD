import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogsDataService } from '../../services/catalogs-data.service';
import { CityModel } from '../../models/city.model';

@Component({
  selector: 'app-catalog-countries',
  templateUrl: './catalog-countries.component.html',
  styleUrls: ['./catalog-countries.component.css']
})
export class CatalogCountriesComponent implements OnInit {
  // Attributes
  private bandAddCity: boolean = false;
  private listOfCities: CityModel[] = [];

  // References
  formCity: FormGroup;

  // Inject services and set the validation rules for each form field.
  constructor( private catalogsDataService: CatalogsDataService, private formBuilder: FormBuilder ) {
    this.generateListOFCities();
    this.formCity = this.formBuilder.group({
      // Required, cannot begin with a space, only admits alphanumerics and must have btw 3 to 40 characters.
      name: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9ÑñáéíóúÁÉÍÓÚ]){2,39}')]]
    });
  }

  ngOnInit(): void {

  }

  private generateListOFCities(): void {
    let aux: object;
    this.catalogsDataService.getCities().subscribe( (resp: any) => {
      aux = { ...resp };
      Object.keys(aux).forEach( (key: string) => {
        const aux2: CityModel = resp[key];
        aux2.id = key;
        this.listOfCities.push(aux2);
      } );
      console.log(this.listOfCities);

    });
  }

  // Methods
  checkSubmit(): void{
    // console.log(this.formCity);
    if (this.formCity.valid) { this.addCity(); }
    this.setBandAddCity(false);
  }

  clickedBtnAddCity(): void{
    this.setBandAddCity(true);
    this.formCity.reset();
  }

  addCity(): void{
    console.log('add city');
    this.catalogsDataService.createCity(this.formCity.value).subscribe( (resp: JSON) => console.log(resp) );
  }

  editCity(index: number): void{
    console.log(index + 'edit');
  }

  deleteCity(index: number): void{
    console.log(index + 'del');
  }

  // Methods for getting if a form field is invalid
  isCityNameInvalid(): boolean{
    const cityNameField = this.formCity.controls.name;
    return (cityNameField.invalid && cityNameField.touched);
  }

  // Setters
  private setBandAddCity(addCity: boolean): void{ this.bandAddCity = addCity; }

  // Getters
  getBandAddCity = (): boolean => this.bandAddCity;
  getListOfCities = (): CityModel[] => this.listOfCities;
}
