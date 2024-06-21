import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditEntityComponent } from './add-edit-entity'
import { ListEntitiesComponent } from './list-entities'



const routes: Routes = [
    { path: '', component: ListEntitiesComponent },
    { path: 'add', component: AddEditEntityComponent },
    { path: 'edit/:id', component: AddEditEntityComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntityRoutingModule { }