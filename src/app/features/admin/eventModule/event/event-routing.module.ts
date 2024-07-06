import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditEventComponent } from './add-edit-event'
import { ListEventsComponent } from './list-events'



const routes: Routes = [
    { path: '', component: ListEventsComponent },
    { path: 'add', component: AddEditEventComponent },
    { path: 'edit/:id', component: AddEditEventComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventRoutingModule { }