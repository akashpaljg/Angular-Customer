import { Component, OnInit } from '@angular/core';
import { ICustomer, IOrder, IOrderItem } from '../shared/interfaces';
import { DataServices } from '../core/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders:IOrder[] = [];
  customer:ICustomer|null = null;
  customerId:number = -1;

  // Activated Route: commonly used for accessing route parameters, query parameters, route data, and the resolved data.
  constructor(private dataService:DataServices,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.customerId = Number(params['id']);
      console.log(params['id'])
    });

    this.dataService.getOrder(this.customerId).subscribe((orders:IOrder[])=> this.orders = orders);
    this.dataService.getCustomer(this.customerId).subscribe((customer: ICustomer | null) => {
      if (customer) {
          this.customer = customer;
      } else {
          // Handle the case where the customer is not found
          this.customer = null;
      }
  });
  }

  handleDelete(id:number){
    const custId = this.customerId ? this.customerId:-1;
    this.dataService.deleteOrder(custId,id);
    this.dataService.getOrder(this.customerId).subscribe((orders:IOrder[])=> this.orders = orders);
  }

  addOrder(orderItem:IOrderItem){
    const custId = this.customerId ? this.customerId:-1;
    this.dataService.addOrder(custId,orderItem);
    this.dataService.getOrder(this.customerId).subscribe((orders:IOrder[])=> this.orders = orders);
  }


}
