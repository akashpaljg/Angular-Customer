import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { map,catchError, filter, tap } from "rxjs/operators";
import { Observable, ObservedValueOf, of, throwError } from "rxjs";
import { ICustomer, IOrder, IOrderItem } from "../shared/interfaces";

@Injectable()
export class DataServices {
    baseURL:string = "assets/";

    constructor(private http:HttpClient){
        // localStorage.clear();
        this.getCustomers().subscribe(); // Observable is called by subscribing
        this.getOrders().subscribe();
        this.updateAllCustomerOrderTotals();
    }

    updateAllCustomerOrderTotals(): void {
        let customers:ICustomer[] = JSON.parse(localStorage.getItem('customer') || '{}');
        let orders:IOrder[] = JSON.parse(localStorage.getItem('order')||'{}');

        if(!customers && !orders){
            return;
        }
        customers.forEach(customer => {
            const customerOrders = orders.filter(o => o.customerId === customer.id)[0];
                const customerOrderTotal = customerOrders.orderItems?.reduce((acc, order) => 
                    acc + order.itemCost
               , 0);
               customer.orderTotal = customerOrderTotal;
            
        });
        localStorage.setItem('customer', JSON.stringify(customers));
    }

    getCustomers():Observable<ICustomer[]>{
       
        const localData = localStorage.getItem('customer');
        if (localData) {
            return of(JSON.parse(localData) as ICustomer[]);
        }else{
            return this.http.get<ICustomer[]>(this.baseURL + "customers.json")
            .pipe(
                tap((customer:ICustomer[])=>{
                    localStorage.setItem('customer',JSON.stringify(customer));
                }),
                catchError(this.handleError)
            );
        }
       
    }

    getCustomer(id: number): Observable<ICustomer | null> {
        const localData = localStorage.getItem('customer');
        if(localData){
            const customers = (JSON.parse(localData) as ICustomer[]);
            const customer = customers.filter((c)=>c.id === id);
            return of (customer[0]);
        }
        return of(null);
    }

    deleteCustomer(id:number) : void{
        const localData = localStorage.getItem('customer');
        if(localData){
            const customers = (JSON.parse(localData) as ICustomer[]);
            const updatedCustomers = customers.filter((c)=>c.id !== id);
            localStorage.setItem('customer',JSON.stringify(updatedCustomers));
        }
    }

    addCustomer(customer:ICustomer) {
        const localData = localStorage.getItem('customer');
        if(localData){
            const customers = (JSON.parse(localData) as ICustomer[]);
            customers.push(customer);
            localStorage.setItem('customer',JSON.stringify(customers));
        }
        
    }

    editCustomer(id: number, newCustomer: ICustomer) {
        const localData = localStorage.getItem('customer');
        if (localData) {
            const customers: ICustomer[] = JSON.parse(localData);
            const customerIndex = customers.findIndex((c: ICustomer) => c.id === id);
            if (customerIndex !== -1) {
                customers[customerIndex] = newCustomer;
                localStorage.setItem('customer', JSON.stringify(customers));
            }
        }
    }
    

    getOrders() : Observable<IOrder[]>{
        const localData = localStorage.getItem('order');
        if (localData) {
            const orders = (JSON.parse(localData) as IOrder[]);
            return of(orders);
        }
        return this.http.get<IOrder[]>(this.baseURL + "orders.json")
            .pipe(
                tap((orders) => {
                    localStorage.setItem('order', JSON.stringify(orders));
                }), catchError(this.handleError)
            );
    }


    getOrder(id: number): Observable<IOrder[]> {
        const localData = localStorage.getItem('order');
        if (localData) {
            const orders = (JSON.parse(localData) as IOrder[]);
            const customerOrders = orders.filter((o) => o.customerId === id);
            return of(customerOrders);
        }
        return this.http.get<IOrder[]>(this.baseURL + "orders.json")
            .pipe(
                tap((orders) => {
                    localStorage.setItem('order', JSON.stringify(orders));
                }),
                map(orders => orders.filter(o => o.customerId === id)), // Ensure we filter the orders for the specific customer
                catchError(this.handleError)
            );
    }

    updateOrderTotal(id:number){
        const localData = localStorage.getItem('order');
        const localCustomers = localStorage.getItem('customer');
        if(localData && localCustomers){
            const Orders = (JSON.parse(localData) as IOrder[]);
            let customerOrder = Orders.filter((o)=>o.customerId === id)[0];
            let customerOrderTotal = customerOrder.orderItems.reduce((acc,sum)=>acc+sum.itemCost,0);
            
            const Customers = (JSON.parse(localCustomers) as ICustomer[]);
            let customer = Customers.filter((c)=>c.id === id)[0];
            customer.orderTotal = customerOrderTotal;
            localStorage.setItem('customer',JSON.stringify(Customers));
        }
    }
    

    addOrder(id:number,order:IOrderItem){
        const localData = localStorage.getItem('order');
        if(localData){
            let orders = (JSON.parse(localData) as IOrder[]);
            let customerOrder = orders.filter((o)=>o.customerId === id)[0];
            if(!customerOrder){
                orders.push({customerId:id,orderItems:[order]})
            }else{
                customerOrder.orderItems.push(order);
            }
            localStorage.setItem('order',JSON.stringify(orders));
        }
        this.updateAllCustomerOrderTotals();
    }

    deleteOrder(cId:number,pId:number){
        const localData = localStorage.getItem('order');
        if(localData){
            const orders:IOrder[] = JSON.parse(localData);
            let cOrder = orders.filter((o)=>o.customerId === cId)[0];
            cOrder.orderItems = cOrder.orderItems.filter((orderItem)=>orderItem.id !== pId);
            localStorage.setItem('order',JSON.stringify(orders));
        }
        this.updateAllCustomerOrderTotals();
    }
    

    private handleError(error: any) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return throwError(errMessage);
        }
        return throwError(error || 'Node.js server error');
    }
}