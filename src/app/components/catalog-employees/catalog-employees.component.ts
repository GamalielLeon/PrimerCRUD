import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogsDataService } from 'src/app/services/catalogs-data.service';
import { EmployeeModel } from '../../models/employee.model';
import { OfficeModel } from '../../models/office.model';

@Component({
  selector: 'app-catalog-employees',
  templateUrl: './catalog-employees.component.html',
  styleUrls: ['./catalog-employees.component.css']
})
export class CatalogEmployeesComponent implements OnInit {
  // Attributes
  private listOfEmployees: EmployeeModel[] = [];
  private listOfOffices: OfficeModel[] = [];
  private dataOperation: number = 0;
  private indexEmployee: number = 0;
  private KEYS_FORM_EMPLOYEE: string[] = [];
  // References
  formEmployee: FormGroup;

  constructor(private catalogsDataService: CatalogsDataService, private formBuilder: FormBuilder) {
    this.generateListOfEmployees();
    this.generateListOfOffices();
    this.formEmployee = formBuilder.group({
      // Required, cannot begin with a space, only admits alphanumerics and must have btw 3 to 40 characters.
      number: ['', [Validators.required, Validators.pattern('[0-9]{10,12}')]],
      name: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9ÑñáéíóúÁÉÍÓÚ]){2,39}')]],
      email: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9._-]{2,})+(@[a-zA-Z0-9._-]{2,})+(\.[a-z]{2,5}$)')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      office: ['', [Validators.required]]
    });
    // Store the attributes of the form into a string array
    this.KEYS_FORM_EMPLOYEE = Object.keys(this.formEmployee.value);
  }

  ngOnInit(): void { }

  /********** METHODS **********/
  checkSubmit(): void{
    if (this.formEmployee.valid) { this.dataOperation === 1 ? this.addEmployee() : this.editEmployee(); }
    this.formEmployee.reset();
  }
  // Methods for checking wether the form fields are invalid
  isEmployeeNumberInvalid(): boolean{
    const employeeNumberField = this.formEmployee.controls.number;
    return (employeeNumberField.invalid && employeeNumberField.touched);
  }
  isEmployeeNameInvalid(): boolean{
    const employeeNameField = this.formEmployee.controls.name;
    return (employeeNameField.invalid && employeeNameField.touched);
  }
  isEmployeeEmailInvalid(): boolean{
    const employeeEmailField = this.formEmployee.controls.email;
    return (employeeEmailField.invalid && employeeEmailField.touched);
  }
  isEmployeePhoneNumberInvalid(): boolean{
    const employeePhoneNumberField = this.formEmployee.controls.phoneNumber;
    return (employeePhoneNumberField.invalid && employeePhoneNumberField.touched);
  }
  isEmployeeOfficeInvalid(): boolean{
    const employeeOfficeField = this.formEmployee.controls.office;
    return (employeeOfficeField.invalid && employeeOfficeField.touched);
  }
  areEmployeeFieldsInvalid(): boolean {
    return this.isEmployeeNumberInvalid() && this.isEmployeeNameInvalid() &&
    this.isEmployeePhoneNumberInvalid() && this.isEmployeeEmailInvalid() && this.isEmployeeOfficeInvalid();
  }

  // Methods that check wether a button is pressed
  clickedBtnAddEmployee(): void{
    this.dataOperation = 1;
    this.formEmployee.reset();
  }
  clickedBtnEditEmployee(index: number): void{
    this.dataOperation = 2;
    this.indexEmployee = index;
    const currentEmployeeToEdit: any = this.listOfOffices[this.indexEmployee];
    for (const key of this.KEYS_FORM_EMPLOYEE){ this.formEmployee.controls[key].setValue(currentEmployeeToEdit[key]); }
  }
  clickedBtnDeleteEmployee(index: number): void{
    if (window.confirm('¿Está seguro de querer borrar este empleado?')) {
      this.indexEmployee = index;
      this.deleteEmployee();
      this.listOfEmployees.splice(index, 1);
    }
  }
  // Methods to perform the data operations: Create, Read, Update, Delete
  private addEmployee(): void{
    this.catalogsDataService.createEmployee(this.formEmployee.value).subscribe( (employeeAdded: EmployeeModel) => {
      this.listOfEmployees.push(employeeAdded);
    } );
  }
  private editEmployee(): void{
    const employeeToEdit: any = this.listOfEmployees[this.indexEmployee];
    for (const key of this.KEYS_FORM_EMPLOYEE){
      employeeToEdit[key] = this.formEmployee.value[key];
    }
    this.catalogsDataService.updateEmployee(employeeToEdit).subscribe( (employeeEdited: object) => console.log(employeeEdited) );
  }
  private deleteEmployee(): void{
    const aux: EmployeeModel = this.listOfEmployees[this.indexEmployee];
    this.catalogsDataService.deleteEmployee(String(aux.id)).subscribe();
  }
  private generateListOfEmployees(): void {
    // Generate an array of EmployeesModel objects, adding the id of each one obtained from Firebase
    // First, create a new reference for the JSON object brought from Firebase
    // Then, obtain an array with the properties of that JSON (which are the ID's)
    // Finally, get the value of each ID property and store it into an object array.
    let employeesJsonTemp: object;
    this.catalogsDataService.getEmployees().subscribe( (employeesJson: any) => {
      employeesJsonTemp = { ...employeesJson };
      Object.keys(employeesJsonTemp).forEach( (id: string) => {
        const employeeTemp: EmployeeModel = employeesJson[id];
        employeeTemp.id = id;
        this.listOfEmployees.push(employeeTemp);
      });
    });
  }
  private generateListOfOffices(): void {
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

  /********** GETTERS **********/
  getListOfEmployees = (): EmployeeModel[] => this.listOfEmployees;
  getListOfOffices = (): OfficeModel[] => this.listOfOffices;

}
