import { Component, OnInit } from '@angular/core';
import { DataServices } from '../core/data.service';
import { ICustomer } from '../shared/interfaces';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls : ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
    title: string = "";
    testVar:string = "Hello, How are you";
    people: ICustomer[] = [];

    name:string = "";
    city:string = "";
    order:number = 0;
    constructor(private dataService:DataServices) {}
    
    ngOnInit() {
        this.title = 'Customers';
        this.dataService.getCustomers().subscribe((customers:ICustomer[])=>this.people = customers);
    }

    deleteCustomer(id:number){
        this.dataService.deleteCustomer(id);
        this.dataService.getCustomers().subscribe((customers:ICustomer[])=>this.people = customers);
    }

    editCustomer(customer:ICustomer){
        this.dataService.editCustomer(customer.id,customer);
        this.dataService.getCustomers().subscribe((customers:ICustomer[])=>this.people = customers);
    }

    add(customer:ICustomer){
       this.dataService.addCustomer(customer);
       this.dataService.getCustomers().subscribe((customers:ICustomer[])=>this.people = customers);
    }

    
   
}