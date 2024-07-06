import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { LayoutComponent } from './layout';
import { DetailsComponent } from './details/details.component';
import { AuthGuard } from '@app/core';
import { TakeQuizComponent } from './take-quiz';
import { certificatesComponent } from './certificates';


const routes: Routes = [
  
  {
    path: '', component: LayoutComponent,
    children: [
        { path: '', component: ListComponent },
        { path: 'details/:id', component: DetailsComponent },
        { path: 'mycourses', component: MyCoursesComponent },
        { path: 'take/:id', component: TakeQuizComponent },
        { path: 'certificate', component: certificatesComponent },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
