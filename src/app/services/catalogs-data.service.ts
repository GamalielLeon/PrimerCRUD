import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CityModel } from '../models/city.model';
import { OfficeModel } from '../models/office.model';
import { EmployeeModel } from '../models/employee.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  createCity(city: CityModel): Observable<CityModel> {
    return this.http.post(`${this.urlFireBase}/cities.json`, city).pipe(
      map(
        (cityObjectFirebase: any) => {
          city.id = cityObjectFirebase.name;
          return city;
        } )
    );
  }
  createOffice(office: OfficeModel): Observable<OfficeModel> {
    return this.http.post(`${this.urlFireBase}/offices.json`, office).pipe(
      map(
        (officeObjectFirebase: any) => {
          office.id = officeObjectFirebase.name;
          return office;
        } )
    );
  }
  createEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
    return this.http.post(`${this.urlFireBase}/employees.json`, employee).pipe(
      map(
        (employeeObjectFirebase: any) => {
          employee.id = employeeObjectFirebase.name;
          return employee;
        } )
    );
  }

  // Methods that update an element in Firebase
  /*
  // Create a new reference for the element received
  // Use the new reference to delete the 'id' property
  // Update the element in Firebase using the new reference
  */
  updateCity(city: CityModel): Observable<object> {
    const cityTemp = { ...city };
    delete cityTemp.id;
    return this.http.put(`${this.urlFireBase}/cities/${city.id}.json`, cityTemp);
  }
  updateOffice(office: OfficeModel): Observable<object> {
    const officeTemp = { ...office };
    delete officeTemp.id;
    return this.http.put(`${this.urlFireBase}/offices.json`, officeTemp);
  }
  updateEmployee(employee: EmployeeModel): Observable<object> {
    const employeeTemp = { ...employee };
    delete employeeTemp.id;
    return this.http.put(`${this.urlFireBase}/employees.json`, employeeTemp);
  }

  // Methods that delete an element in Firebase
  deleteCity = (cityId: string): Observable<object> => this.http.delete(`${this.urlFireBase}/cities/${cityId}.json`);
  deleteOffice = (officeId: string): Observable<object> => this.http.delete(`${this.urlFireBase}/offices/${officeId}.json`);
  deleteEmployee = (employeeId: string): Observable<object> => this.http.delete(`${this.urlFireBase}/employees/${employeeId}.json`);

  // Methods that get all the data from Firebase
  getCities = (): Observable<object> => this.http.get(`${this.urlFireBase}/cities.json`);
  getOffices = (): Observable<object> => this.http.get(`${this.urlFireBase}/offices.json`);
  getEmployees = (): Observable<object> => this.http.get(`${this.urlFireBase}/employees.json`);
}
