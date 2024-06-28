import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout';
import { EventListComponent } from './list';
import { EventdetailsComponent } from './details';

const routes: Routes = [
  
  {
    path: '', component: LayoutComponent,
    children: [
        { path: '', component: EventListComponent },
        { path: 'details/:id', component: EventdetailsComponent  },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
