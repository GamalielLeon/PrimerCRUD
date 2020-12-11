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
  employees = [
    {number: 1, name: 'nombre y apellidos 1', email: 'correo electrónico 1', phoneNumber: 11111111, office: 'office 1'},
    {number: 2, name: 'nombre y apellidos 2', email: 'correo electrónico 2', phoneNumber: 22222222, office: 'office 2'},
    {number: 3, name: 'nombre y apellidos 3', email: 'correo electrónico 3', phoneNumber: 33333333, office: 'office 3'}
  ];
  // Attributes
  private listOfEmployees: EmployeeModel[] = [];
  private listOfOffices: OfficeModel[] = [];
  private dataOperation: number = 0;
  private indexEmployee: number = 0;
  private KEYS_FORM_EMPLOYEE: string[] = [];
  // References
  formEmployee: FormGroup;

  constructor(private catalogsDataService: CatalogsDataService, private formBuilder: FormBuilder) {
    // this.generateListOfOffices();
    // this.generateListOfCities();
    this.formEmployee = formBuilder.group({
      // Required, cannot begin with a space, only admits alphanumerics and must have btw 3 to 40 characters.
      number: ['', [Validators.required, Validators.pattern('[0-9]{10,12}')]],
      name: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9ÑñáéíóúÁÉÍÓÚ]){2,39}')]],
      email: ['', [Validators.pattern('([a-zA-z0-9._-]{2,})+(@[a-zA-Z0-9.-]{2,})+\.([a-z]{2,})$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      office: ['', [Validators.required]]
    });
    // Store the attributes of the form into a string array
    this.KEYS_FORM_EMPLOYEE = Object.keys(this.formEmployee.value);
  }

  ngOnInit(): void { }

  checkSubmit(): void{
    console.log(this.formEmployee.controls.email);
  }

  // Methods
  addEmployee(): void{
    console.log('add employee');
  }

  editEmployee(index: number): void{
    console.log(index + 'edit');
  }

  deleteEmployee(index: number): void{
    console.log(index + 'del');
  }

  // Setters

  // Getters

}
