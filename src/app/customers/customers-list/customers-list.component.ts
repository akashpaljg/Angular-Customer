import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { ICustomer, IEdit } from '../../shared/interfaces';
import { SorterService } from 'src/app/core/sorter.service';
import { DataServices } from 'src/app/core/data.service';

@Component({
    selector: 'app-customers-list',
    templateUrl: './customers-list.component.html',
    styleUrls:['customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
    private _customers: ICustomer[] = [];
    eName:string = "";
    eCity:string = "";
    eOrderTotal:number = 0;
   
    editStatus:IEdit = {
        editIndex:-1
    };

    @Input() get customers(): ICustomer[] {
        return this._customers;
    }
    
    set customers(value: ICustomer[]) {
        if (value) {
            this.filteredCustomers = this._customers = value;
            this.calculateOrders();
        }
    }

    @Output() deleteCustomer: EventEmitter<number> = new EventEmitter<number>();
    @Output() editCustomer: EventEmitter<ICustomer> = new EventEmitter<ICustomer>();

    filteredCustomers: any[] = [];
    customersOrderTotal!: number;
    currencyCode: string = 'USD';
    
    constructor(private sorterService:SorterService,private dataService:DataServices) {}
    
    ngOnInit() {
    }



    calculateOrders() {
        this.customersOrderTotal = 0;
        this.filteredCustomers.forEach((cust: ICustomer) => {
            console.log(cust.orderTotal)
            this.customersOrderTotal += cust.orderTotal ? cust.orderTotal:0;
        });
    }

    delete(id:string){
        this.deleteCustomer.emit(+id);
    }

    edit(id:string){
        this.editStatus.editIndex = +id;
        let eCustomer = this.filteredCustomers.filter((cust)=>cust.id === +id)[0];
        this.eName = eCustomer.name;
        this.eCity = eCustomer.city;
        this.eOrderTotal = eCustomer.orderTotal;
    }

    save(){
        console.log(this.eName+" "+this.eCity);
        const newCustomer:ICustomer = {
            id: this.editStatus.editIndex,
            name: this.eName,
            city: this.eCity,
            orderTotal: this.eOrderTotal,
            filter: function (arg0: (c: any) => any): unknown {
                throw new Error('Function not implemented.');
            },
            customerSince: undefined
        }

        this.editCustomer.emit(newCustomer);
        this.editStatus.editIndex = -1;
    }
    
    filter(data: string) {
        if (data) {
            this.filteredCustomers = this.customers.filter((cust: ICustomer) => {
                return cust.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                       cust.city.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                       (cust.orderTotal?.toString() || '').indexOf(data) > -1;
            });
            
        } else {
            this.filteredCustomers = this.customers;
        }
        this.calculateOrders();
    }
    
    sort(prop: string) {
        // A sorter service will handle the sorting
        this.sorterService.sort(this.filteredCustomers,prop);
    }
}