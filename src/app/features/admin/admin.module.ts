import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SideBarComponent } from './sidebar';
import { LayoutComponent } from './layout';
import { OverviewComponent } from './navbar';
import { SharedModule } from '@app/shared';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        SharedModule
    ],
    declarations: [
        SideBarComponent,
        LayoutComponent,
        OverviewComponent
    ]
})
export class AdminModule { }