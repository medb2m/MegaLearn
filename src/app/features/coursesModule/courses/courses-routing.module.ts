import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { LayoutComponent } from './layout';
import { DetailsComponent } from './details/details.component';
import { TakeQuizComponent } from './take-quiz';
import { certificatesComponent } from './certificates';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,data: { skipBreadcrumb: true },
    children: [
        { path: '', component: ListComponent },
        { path: 'details/:id', component: DetailsComponent , data : { breadcrumb : 'Details' }},
        { path: 'mycourses', component: MyCoursesComponent , data : { breadcrumb : 'My Courses' }},
        { path: 'take/:id', component: TakeQuizComponent , data : { breadcrumb : 'Pass Test' }},
        { path: 'certificate', component: certificatesComponent , data : { breadcrumb : 'Certificates' } },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
