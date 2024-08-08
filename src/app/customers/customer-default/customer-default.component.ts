import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICustomer } from 'src/app/shared/interfaces';


@Component({
    selector: 'app-customers-default',
    templateUrl: './customer-default.component.html',
    styleUrls:['./customer-default.component.css']
})

export class CustomerDefaultComponent implements OnInit {
    name:string = "";
    city:string = "";
    order:number = 0;
    constructor(){}

    ngOnInit(): void {
        
    }

    @Output() customerAdded = new EventEmitter<ICustomer>();

    handleSubmit(){
       const cutsomer:ICustomer = {
           name: this.name,
           city: this.city,
           orderTotal: this.order,
           filter: function (arg0: (c: any) => any): unknown {
               throw new Error('Function not implemented.');
           },
           id: Number(Math.random()*100+5),
           customerSince: undefined
       }

       this.customerAdded.emit(cutsomer);
       
       this.name = "";
        this.city = "";
        this.order = 0;
    }

}