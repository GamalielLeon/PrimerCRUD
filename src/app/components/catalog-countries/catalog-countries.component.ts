import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogsDataService } from '../../services/catalogs-data.service';
import { CityModel } from '../../models/city.model';

enum DataOperation{
  read = 0,
  add,
  edit,
  delete
}
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
    this.generateListOFCities();
    this.formCity = this.formBuilder.group({
      // Required, cannot begin with a space, only admits alphanumerics and must have btw 3 to 40 characters.
      name: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9ÑñáéíóúÁÉÍÓÚ]){2,39}')]]
    });
  }

  ngOnInit(): void { console.log(this.formCity.controls); }

  /********** METHODS **********/

  // Method to generate an array of CityModel objects, adding the id of each one obtained from Firebase
  private generateListOFCities(): void {
    let respTemp: object;
    this.catalogsDataService.getCities().subscribe( (resp: any) => {
      respTemp = { ...resp };
      Object.keys(respTemp).forEach( (key: string) => {
        const cityTemp: CityModel = resp[key];
        cityTemp.id = key;
        this.listOfCities.push(cityTemp);
      } );
    });
  }

  checkSubmit(): void{
    if (this.formCity.valid) {
      switch (this.getDataOperation()){
        case DataOperation.add:
          this.addCity();
          console.log('operation set to "add"');
          break;
        case DataOperation.edit:
          this.editCity();
          console.log('operation set to "edit"');
          break;
        case DataOperation.delete:
          this.deleteCity();
          console.log('operation set to "delete"');
          break;
        default:
          console.log('operation set to "read"');
      }
      this.dataOperation = 0;
      this.formCity.reset();
    }
  }

  clickedBtnAddCity(): void{
    this.dataOperation = 1;
    this.formCity.reset();
  }

  clickedBtnEditCity(index: number): void{
    this.dataOperation = 2;
    this.indexCity = index;
    this.formCity.controls.name.setValue('ddd');

  }

  clickedBtnDeleteCity(index: number): void{
    this.dataOperation = 3;
    this.indexCity = index;
  }

  addCity(): void{
    console.log('add city');
    this.catalogsDataService.createCity(this.formCity.value).subscribe( (resp: CityModel) => {
      this.listOfCities.push(resp);
    } );
  }

  editCity(): void{
    const cityToEdit = this.getListOfCities()[this.indexCity];
    cityToEdit.name = this.formCity.value.name;
    this.catalogsDataService.updateCity(cityToEdit).subscribe( (resp: CityModel) => console.log(resp) );
  }

  deleteCity(): void{
  }

  // Method for getting if a form field is invalid
  isCityNameInvalid(): boolean{
    const cityNameField = this.formCity.controls.name;
    return (cityNameField.invalid && cityNameField.touched);
  }

  /********** SETTERS **********/
  setDataOperation(dataOp: number): void { this.dataOperation = dataOp; }

  /********** GETTERS **********/
  getListOfCities = (): CityModel[] => this.listOfCities;
  getDataOperation = (): number => this.dataOperation;
}
