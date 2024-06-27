import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
=======

>>>>>>> 6fc3a2271eb8225e1dccda0dac38ac604ab21559
import { HomeComponent } from '@features/home';
import { AuthGuard } from '@core/index';
import { Role } from '@app/_models';
import { RedirectAdminGuard } from '@core/index';

const accountModule = () => import('@features/accountsModule').then(x => x.AccountsModule);
const adminModule = () => import('@features/admin/admin.module').then(x => x.AdminModule);
const coursesModule = () => import('@features/coursesModule').then(x => x.CoursesModule);
const PM = () => import('@features/accountsModule/profile/profile.module').then(x => x.ProfileModule);
const PaymentModule = () => import('@features/coursesModule/payment').then(x => x.PaymentModule);
<<<<<<< HEAD
=======
const EventModule = () => import('@features/eventsModule').then(x => x.EventModule);
>>>>>>> 6fc3a2271eb8225e1dccda0dac38ac604ab21559
const FM = () => import('@features/featuresModule/feature/features.module').then(x => x.FeatureModule);


const routes: Routes = [
<<<<<<< HEAD
    { path: '', component: HomeComponent, canActivate: [RedirectAdminGuard]},
    { path: 'account', loadChildren: accountModule },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin], breadcrumb : 'admin' } },
    { path: 'courses', loadChildren: coursesModule , canActivate : [AuthGuard] , data : { breadcrumb : 'courses' }},
    { path: 'profile', loadChildren: PM , canActivate : [AuthGuard]},
    { path: 'pay', loadChildren: PaymentModule , canActivate : [AuthGuard]},
    { path: 'hello', loadChildren: FM , canActivate : [AuthGuard]},
    // otherwise redirect to home
   // { path: '**', redirectTo: '' }
=======
    { path: '', component: HomeComponent, canActivate: [RedirectAdminGuard] , data : { breadcrumb : 'Home'  }},
    { path: 'account', loadChildren: accountModule },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'courses', loadChildren: coursesModule , data : { breadcrumb : 'Courses' , title : 'Courses' }},
    { path: 'profile', loadChildren: PM , canActivate : [AuthGuard] , data : { breadcrumb : 'Profile' , title : 'Profile'}},
    { path: 'pay', loadChildren: PaymentModule , canActivate : [AuthGuard], data : { breadcrumb : 'Payment', title : 'Payment' }},
    { path: 'event', loadChildren: EventModule , data : { breadcrumb : 'Event', title : 'Events' }},
    { path: 'hello', loadChildren: FM , canActivate : [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
>>>>>>> 6fc3a2271eb8225e1dccda0dac38ac604ab21559
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
