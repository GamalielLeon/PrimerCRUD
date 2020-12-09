import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CityModel } from '../models/city.model';
import { OfficeModel } from '../models/office.model';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogsDataService {
  private urlFireBase = 'https://databasefirstcrud-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient ) { }

  createCity(city: CityModel): any { return this.http.post(`${this.urlFireBase}/cities.json`, city); }
  createOffice(office: OfficeModel): any { return this.http.post(`${this.urlFireBase}/cities.json`, office); }
  createEmployee(employee: EmployeeModel): any { return this.http.post(`${this.urlFireBase}/cities.json`, employee); }
}
