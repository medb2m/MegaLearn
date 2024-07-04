import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditQuizComponent } from './add-edit-quiz';
import { ListQuizComponent } from './list-quiz';

const routes: Routes = [
  { path: '', component: ListQuizComponent },
  { path: 'add', component:  AddEditQuizComponent},
  { path: 'edit/:id', component: AddEditQuizComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
