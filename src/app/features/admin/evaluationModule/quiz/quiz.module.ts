import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { AddEditQuizComponent } from './add-edit-quiz/add-edit-quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListQuizComponent } from './list-quiz';

import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [
    AddEditQuizComponent,
    ListQuizComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class QuizModule { }
