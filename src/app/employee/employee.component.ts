import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';  
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/employee';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-employee',
	templateUrl: './employee.component.html',
	styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

	model: any = {};
	allEmployees: any = [];    
	allStates: any = [];    
	ELanguage:boolean;
	BLanguage:boolean;
	HLanguage:boolean;
	localUrl:any;
	routeParams:string;

	constructor(
		private employeeService: EmployeeService, private activatedRoute:ActivatedRoute) { }

	ngOnInit() {
		this.loadStates();
		this.loadAllEmployees();
		// console.log(new Date().toISOString().substr(0,10));
		this.model.State=0;
		this.model.DateOfBirth=new Date().toISOString().substr(0,10);
		// console.log(this.activatedRoute.snapshot.paramMap.get('id'));
		this.routeParams = this.activatedRoute.snapshot.paramMap.get('id');
		if(Number(this.routeParams) > 0){
			this.loadEmployeeToEdit(this.routeParams);
		}
	}    

	datechange(){
		// console.log(this.model.DateOfBirth);
	}

	loadStates() {
		
		this.employeeService.getState().subscribe(res=>{
			// console.log(res);
			this.allStates=res;
		});  
	} 

	loadAllEmployees() {
		
		this.employeeService.getAllEmployee().subscribe(res=>{
			// console.log(res);
			this.allEmployees=res;
		});  
	} 

	onFormSubmit() { 
		// console.log(this.model);
		this.model.Language=(this.ELanguage == true ? 1:0) +', '+ (this.BLanguage == true ? 2:0) +', '+ (this.HLanguage == true ? 3:0);
		if(this.model.EmpId > 0){ this.UpdateEmployee(this.model); }
		else{ this.CreateEmployee(this.model); }
	}

	showPreviewImage(event: any) {
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.onload = (event: any) => {
				this.localUrl = event.target.result;
				// console.log(this.localUrl);
				this.model.Photo=event.target.result;
			}
			reader.readAsDataURL(event.target.files[0]);
			// console.log(event.target.files[0]);
		}
	}

	CreateEmployee(employee: Employee) {  
		// console.log(employee);
		this.employeeService.createEmployee(employee).subscribe(  
			(emp) => {  
				// console.log(emp);
				this.model={};
				this.loadAllEmployees();
			}  
			);  
	}

	UpdateEmployee(employee: Employee) {  
		// console.log(employee);
		this.employeeService.updateEmployee(employee).subscribe(  
			(emp) => {  
				// console.log(emp);
				this.model={};
				this.loadAllEmployees();
			}  
			);  
	}

	loadEmployeeToEdit(EmpId:string){
		// console.log(EmpId);
		this.employeeService.getEmployeeById(EmpId).subscribe(
			(emp)=>{
				// console.log(emp);
				this.model.EmpId=emp.EmpId;
				this.model.EmpName=emp.EmpName;
				this.model.Gender=emp.Gender;
				this.model.DateOfBirth=emp.DateOfBirth.substr(0,10);
				//this.model.DateOfBirth='2020-10-20';   
				this.model.State=emp.State;     
				this.model.Address=emp.Address;  
				this.model.Phone=emp.Phone;      
				this.model.EmailId=emp.EmailId;                
				var splitLang=emp.Language.split(',');
				// console.log(splitLang);
				if(splitLang[0]==1){
					this.ELanguage=true;
				}
				if(splitLang[1]==2){
					this.BLanguage=true;
				}
				if(splitLang[2]==3){
					this.HLanguage=true;
				}
				if(emp.Photo != undefined){
					this.model.Photo=emp.Photo;
					this.localUrl=emp.Photo;
				}
			}
			);
	}   



}


