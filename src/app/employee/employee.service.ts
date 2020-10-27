import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employee';
import { api_endpoint } from '../app.constant';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
    url = api_endpoint;  
    constructor(private http: HttpClient) { }

    getState(){ 
        return this.http.get<any>(this.url + '/GetStateList');  
    } 

    getAllEmployee(){ 
        return this.http.get<any>(this.url + '/AllEmployeeDetails');  
    } 

    createEmployee(employee: Employee){  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<any>(this.url + '/InsertEmployeeDetails',  
    employee, httpOptions);  
  }

  getEmployeeById(EmpID:string){
      return this.http.get<any>(this.url+'/GetEmployeeDetailsById/'+EmpID);
  }

  updateEmployee(employee: Employee){  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<any>(this.url + '/UpdateEmployeeDetails',  
    employee, httpOptions);  
  }

  deleteEmployeeById(EmpID: string) { 
    return this.http.delete<any>(this.url + '/DeleteEmployeeDetails?id=' +EmpID);  
  }  


    // login(username: string, password: string) {

    //     return this.http.post<any>('http://localhost:5144/api/test/authenticate', { username: username, password: password })
    //         .map(user => {
    //             // login successful if there's a jwt token in the response
    //             console.log(user);
    //             if (user && user.token) {
    //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify(user));
    //             }

    //             return user;
    //         });
    // }
}
