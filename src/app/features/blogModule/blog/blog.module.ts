import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { LayoutComponent } from './layout';
import { SharedModule } from '@app/shared';
import { BlogRoutingModule } from './blog-routing.module';



@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    LayoutComponent,
  
    
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ]
})
export class BlogModule { }
