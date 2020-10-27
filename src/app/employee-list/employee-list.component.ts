import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';  
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

	allEmployees: any = [];    

  constructor(private employeeService: EmployeeService, private _router:Router) { }

  ngOnInit(): void {
  	this.loadAllEmployees();
  }

  loadAllEmployees() {
        
        this.employeeService.getAllEmployee().subscribe(res=>{
            // console.log(res);
            this.allEmployees=res;
        });  
    } 

    loadEmployeeToEdit(EmpId:string){
    	// console.log(EmpId);
    	this._router.navigate(['/employee/'+EmpId]);
    }

    deleteEmployee(EmpId:string){
        // console.log(EmpId);
        if(confirm('Are you sure that you want to delete this particular record?')){
            this.employeeService.deleteEmployeeById(EmpId).subscribe(
            (emp)=>{
                // console.log(emp);
                this.loadAllEmployees();
            });
        }
    }

}
