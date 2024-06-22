import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



import { EntityRoutingModule } from './entity-routing.module';
import { AddEditEntityComponent } from './add-edit-entity'
import { ListEntitiesComponent } from './list-entities'
import { SharedModule } from '@app/shared';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EntityRoutingModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        ListEntitiesComponent,
        AddEditEntityComponent
    ]
})
export class EntityModule { }