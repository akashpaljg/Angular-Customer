import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataServices } from './data.service';
import { SorterService } from './sorter.service';


@NgModule({
    imports: [ HttpClientModule ],
    providers: [ DataServices,SorterService ]
})

export class CoreModule { }