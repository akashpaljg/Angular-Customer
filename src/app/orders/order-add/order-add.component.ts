import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IOrder, IOrderItem } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-order-add',
    templateUrl: './order-add.component.html',
    styleUrls : ['./order-add.component.css']
})
export class OrdersAddComponent implements OnInit {
    pName:string = "";
    pCost:number = 0;

    @Output() order:EventEmitter<IOrderItem> = new EventEmitter<IOrderItem>();

    constructor(){}
  
   ngOnInit(): void {
       
   }

   handleSubmit(){
    const newOrder:IOrderItem = {
        id:(Math.random()*100+10),
        productName:this.pName,
        itemCost:this.pCost
    }
    this.order.emit(newOrder);
    this.pName = "";
    this.pCost = 0;
   }


}