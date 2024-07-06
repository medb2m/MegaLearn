import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditCourseComponent } from './add-edit-course';
import { ListCourseComponent } from './list-courses';
import { SectionsComponent } from './sections/sections.component';
import { SharedModule } from '@app/shared';


@NgModule({
  declarations: [
    AddEditCourseComponent,
    ListCourseComponent,
    SectionsComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CoursesModule { }
