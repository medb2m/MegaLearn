import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditPostComponent } from './add-edit-post'
import { ListPostsComponent } from './list-posts'



const routes: Routes = [
    { path: '', component: ListPostsComponent },
    { path: 'add', component: AddEditPostComponent },
    { path: 'edit/:id', component: AddEditPostComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostRoutingModule { }