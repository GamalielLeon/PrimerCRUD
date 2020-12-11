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
  private listOfCities: CityModel[] = [];
  private dataOperation: number = 0;
  private indexCity: number = 0;
  // References
  formCity: FormGroup;

  // Inject services and set the validation rules for each form field.
  constructor( private catalogsDataService: CatalogsDataService, private formBuilder: FormBuilder ) {
    this.generateListOfCities();
    this.formCity = this.formBuilder.group({
      // Required, cannot begin with a space, only admits alphanumerics and must have btw 3 to 40 characters.
      name: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9ÑñáéíóúÁÉÍÓÚ]){2,39}')]]
    });
  }
  ngOnInit(): void { }

  /********** METHODS **********/
  checkSubmit(): void{
    if (this.formCity.valid) { this.dataOperation === 1 ? this.addCity() : this.editCity(); }
    this.formCity.reset();
  }
  // Method for checking wether a form field is invalid
  isCityNameInvalid(): boolean{
    const cityNameField = this.formCity.controls.name;
    return (cityNameField.invalid && cityNameField.touched);
  }
  // Methods that check wether a button is pressed
  clickedBtnAddCity(): void{
    this.dataOperation = 1;
    this.formCity.reset();
  }
  clickedBtnEditCity(index: number): void{
    this.dataOperation = 2;
    this.indexCity = index;
    this.formCity.controls.name.setValue( this.listOfCities[this.indexCity].name );
  }
  clickedBtnDeleteCity(index: number): void{
    if (window.confirm('¿Está seguro de querer borrar esta ciudad?')) {
      this.dataOperation = 3;
      this.deleteCity(index);
      this.listOfCities.splice(index, 1);
    }
  }
  // Methods to perform the data operations: Create, Read, Update, Delete
  private addCity(): void{
    this.catalogsDataService.createCity(this.formCity.value).subscribe( (cityAdded: CityModel) => {
      this.listOfCities.push(cityAdded);
    } );
  }
  private editCity(): void{
    const cityToEdit: CityModel = this.listOfCities[this.indexCity];
    cityToEdit.name = this.formCity.value.name;
    this.catalogsDataService.updateCity(cityToEdit).subscribe( (cityEdited: object) => console.log(cityEdited) );
  }
  private deleteCity(indexCity: number): void{
    const aux: CityModel = this.listOfCities[indexCity];
    this.catalogsDataService.deleteCity(String(aux.id)).subscribe();
  }
  private generateListOfCities(): void {
    // Generate an array of CityModel objects, adding the id of each one obtained from Firebase
    // First, create a new reference for the JSON object brought from Firebase
    // Then, obtain an array with the properties of that JSON (which are the ID's)
    // Finally, get the value of each ID property and store it into an object array.
    let citiesJsonTemp: object;
    this.catalogsDataService.getCities().subscribe( (citiesJson: any) => {
      citiesJsonTemp = { ...citiesJson };
      Object.keys(citiesJsonTemp).forEach( (id: string) => {
        const cityTemp: CityModel = citiesJson[id];
        cityTemp.id = id;
        this.listOfCities.push(cityTemp);
      });
    });
  }

  /********** GETTERS **********/
  getListOfCities = (): CityModel[] => this.listOfCities;
}
