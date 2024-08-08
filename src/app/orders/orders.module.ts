import { NgModule }      from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { OrdersComponent }  from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersAddComponent } from './order-add/order-add.component';

@NgModule({
  imports:      [ CommonModule, SharedModule, FormsModule,OrdersRoutingModule ],
  declarations: [ OrdersComponent,OrdersAddComponent ]
})
export class OrdersModule { }