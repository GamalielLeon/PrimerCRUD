import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogsDataService } from 'src/app/services/catalogs-data.service';
import { OfficeModel } from '../../models/office.model';
import { CityModel } from '../../models/city.model';

@Component({
  selector: 'app-catalog-offices',
  templateUrl: './catalog-offices.component.html',
  styleUrls: ['./catalog-offices.component.css']
})
export class CatalogOfficesComponent implements OnInit {
  // Attributes
  private listOfOffices: OfficeModel[] = [];
  private listOfCities: CityModel[] = [];
  private dataOperation: number = 0;
  private indexOffice: number = 0;
  private KEYS_FORM_OFFICE: string[] = [];
  // References
  formOffice: FormGroup;

  // Inject services and set the validation rules for each form field.
  constructor(private catalogsDataService: CatalogsDataService, private formBuilder: FormBuilder) {
    this.generateListOfOffices();
    this.generateListOfCities();
    this.formOffice = formBuilder.group({
      // Required, cannot begin with a space, only admits alphanumerics and must have btw 3 to 40 characters.
      name: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9ÑñáéíóúÁÉÍÓÚ]){2,39}')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: ['', [Validators.pattern('[a-zA-Z0-9 _-ÑñáéíóúÁÉÍÓÚ./]{1,}')]],
      city: ['', [Validators.required]]
    });
    // Store the attributes of the form into a string array
    this.KEYS_FORM_OFFICE = Object.keys(this.formOffice.value);
  }
  ngOnInit(): void { }

  /********** METHODS **********/
  checkSubmit(): void{
    if (this.formOffice.valid) { this.dataOperation === 1 ? this.addOffice() : this.editOffice(); }
    this.formOffice.reset();
  }
  // Methods for checking wether the form fields are invalid
  isOfficeNameInvalid(): boolean{
    const officeNameField = this.formOffice.controls.name;
    return (officeNameField.invalid && officeNameField.touched);
  }
  isOfficePhoneNumberInvalid(): boolean{
    const officePhoneNumberField = this.formOffice.controls.phoneNumber;
    return (officePhoneNumberField.invalid && officePhoneNumberField.touched);
  }
  isOfficeAddressInvalid(): boolean{
    const officeAddressField = this.formOffice.controls.address;
    return (officeAddressField.invalid && officeAddressField.touched);
  }
  isOfficeCityInvalid(): boolean{
    const officeCityField = this.formOffice.controls.city;
    return (officeCityField.invalid && officeCityField.touched);
  }
  areOfficeFieldsInvalid(): boolean {
    return this.isOfficeNameInvalid() && this.isOfficePhoneNumberInvalid() && this.isOfficeAddressInvalid() && this.isOfficeCityInvalid();
  }

  // Methods that check wether a button is pressed
  clickedBtnAddOffice(): void{
    this.dataOperation = 1;
    this.formOffice.reset();
  }
  clickedBtnEditOffice(index: number): void{
    this.dataOperation = 2;
    this.indexOffice = index;
    const currentOfficeToEdit: any = this.listOfOffices[this.indexOffice];
    for (const key of this.KEYS_FORM_OFFICE){ this.formOffice.controls[key].setValue(currentOfficeToEdit[key]); }
  }
  clickedBtnDeleteOffice(index: number): void{
    if (window.confirm('¿Está seguro de querer borrar esta oficina?')) {
      this.indexOffice = index;
      this.deleteOffice();
      this.listOfOffices.splice(index, 1);
    }
  }
  // Methods to perform the data operations: Create, Read, Update, Delete
  private addOffice(): void{
    this.catalogsDataService.createOffice(this.formOffice.value).subscribe( (officeAdded: OfficeModel) => {
      this.listOfOffices.push(officeAdded);
    } );
  }
  private editOffice(): void{
    const officeToEdit: any = this.listOfOffices[this.indexOffice];
    for (const key of this.KEYS_FORM_OFFICE){
      officeToEdit[key] = this.formOffice.value[key];
    }
    this.catalogsDataService.updateOffice(officeToEdit).subscribe( (officeEdited: object) => console.log(officeEdited) );
  }
  private deleteOffice(): void{
    const aux: OfficeModel = this.listOfOffices[this.indexOffice];
    this.catalogsDataService.deleteOffice(String(aux.id)).subscribe();
  }
  private generateListOfOffices(): void {
    // Generate an array of OfficeModel objects, adding the id of each one obtained from Firebase
    // First, create a new reference for the JSON object brought from Firebase
    // Then, obtain an array with the properties of that JSON (which are the ID's)
    // Finally, get the value of each ID property and store it into an object array.
    let officesJsonTemp: object;
    this.catalogsDataService.getOffices().subscribe( (officesJson: any) => {
      officesJsonTemp = { ...officesJson };
      Object.keys(officesJsonTemp).forEach( (id: string) => {
        const officeTemp: OfficeModel = officesJson[id];
        officeTemp.id = id;
        this.listOfOffices.push(officeTemp);
      });
    });
  }
  private generateListOfCities(): void {
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
  getListOfOffices = (): OfficeModel[] => this.listOfOffices;
  getListOfCities = (): CityModel[] => this.listOfCities;

}
