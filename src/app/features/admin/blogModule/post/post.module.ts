import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



import { AddEditPostComponent } from './add-edit-post'
import { ListPostsComponent } from './list-posts'
import { SharedModule } from '@app/shared';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PostRoutingModule,
        FormsModule,
        SharedModule,
    ],
    declarations: [
        ListPostsComponent,
        AddEditPostComponent
    ]
})
export class PostModule { }