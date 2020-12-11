import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  formEmployee: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formEmployee = formBuilder.group({});
  }

  ngOnInit(): void {
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
