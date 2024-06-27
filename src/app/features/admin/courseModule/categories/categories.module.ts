import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditCategoryComponent } from './add-edit-category';
import { ListCategoryComponent } from './list-category';
import { SharedModule } from '@app/shared';


@NgModule({
  declarations: [
    AddEditCategoryComponent,
    ListCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CategoriesModule { }
