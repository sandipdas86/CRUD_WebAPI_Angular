import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const appRoutes: Routes = [
    { path: '', component: EmployeeListComponent },
    { path: 'employee', component: EmployeeComponent },
    { path: 'employee/:id', component: EmployeeComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' } 
];

export const routing = RouterModule.forRoot(appRoutes);