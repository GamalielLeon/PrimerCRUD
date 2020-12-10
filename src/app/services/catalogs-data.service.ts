import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CityModel } from '../models/city.model';
import { OfficeModel } from '../models/office.model';
import { EmployeeModel } from '../models/employee.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogsDataService {
  private urlFireBase = 'https://databasefirstcrud-default-rtdb.firebaseio.com';

  // Inject the HttpClient service
  constructor( private http: HttpClient ) { }

  // Methods that create an element in Firebase
  /*
  // Create a method for each set of data
  // this.http.post(...) -> observable
  // pipe(map(...)) -> Concatenating operators to modify the current data flow
  // Inside map(), the id is obtained when the observable is subscribed
  // Inside map(), the id obtained is stored into the current object to save in firebase
  // Finally, the whole object is returned as a result of consuming the service.
  */
  createCity(city: CityModel): any {
    return this.http.post(`${this.urlFireBase}/cities.json`, city).pipe(
      map(
        (resp: any) => {
          city.id = resp.name;
          return city;
        } )
    ); }
  createOffice(office: OfficeModel): any {
    return this.http.post(`${this.urlFireBase}/offices.json`, office).pipe(
      map(
        (resp: any) => {
          office.id = resp.name;
          return office;
        } )
    ); }
  createEmployee(employee: EmployeeModel): any {
    return this.http.post(`${this.urlFireBase}/employees.json`, employee).pipe(
      map(
        (resp: any) => {
          employee.id = resp.name;
          return employee;
        } )
    ); }

  // Methods that update an element in Firebase
  /*
  // Create a new reference for the element received
  // Use the new reference to delete the 'id' property
  // Update the element in Firebase using the new reference
  */
  updateCity(city: CityModel): any {
    const cityTemp = { ...city };
    delete cityTemp.id;
    return this.http.put(`${this.urlFireBase}/cities/${city.id}.json`, cityTemp);
  }
  updateOffice(office: OfficeModel): any {
    const officeTemp = { ...office };
    delete officeTemp.id;
    return this.http.put(`${this.urlFireBase}/offices.json`, officeTemp);
  }
  updateEmployee(employee: EmployeeModel): any {
    const employeeTemp = { ...employee };
    delete employeeTemp.id;
    return this.http.put(`${this.urlFireBase}/employees.json`, employeeTemp);
  }

  // Methods that get all the data from Firebase
  getCities = () => this.http.get(`${this.urlFireBase}/cities.json`);
  getOffices = () => this.http.get(`${this.urlFireBase}/offices.json`);
  getEmployees = () => this.http.get(`${this.urlFireBase}/employees.json`);

}
