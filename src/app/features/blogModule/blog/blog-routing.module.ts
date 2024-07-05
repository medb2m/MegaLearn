import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { LayoutComponent } from './layout';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  
  {
    path: '', component: LayoutComponent,
    children: [
        { path: '', component: ListComponent },
        { path: 'post/:id', component: DetailsComponent },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
