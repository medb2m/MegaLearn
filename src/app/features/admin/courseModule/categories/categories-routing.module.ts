import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoryComponent } from './list-category';
import { AddEditCategoryComponent } from './add-edit-category';


const routes: Routes = [
  { path: '', component: ListCategoryComponent },
  { path: 'add', component: AddEditCategoryComponent },
  { path: 'edit/:id', component: AddEditCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
