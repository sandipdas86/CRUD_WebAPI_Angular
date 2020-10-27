import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { EmployeeService } from './employee/employee.service';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { routing } from './app.routing';

const api_endpoint = 'http://localhost:19485/api/Employee';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
    ],
    declarations: [
        AppComponent,
        EmployeeComponent,
        EmployeeListComponent,
    ],
    providers: [
        EmployeeService,
        {provide: 'API_ENDPOINT', useValue: api_endpoint}
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
