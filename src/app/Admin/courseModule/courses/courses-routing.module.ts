import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCourseComponent } from './list-courses';
import { AddEditCourseComponent } from './add-edit-course';

const routes: Routes = [
  { path: '', component: ListCourseComponent },
  { path: 'add', component: AddEditCourseComponent },
  { path: 'edit/:id', component: AddEditCourseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
