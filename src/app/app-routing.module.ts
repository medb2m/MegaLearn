import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '@features/home';
import { AuthGuard } from '@core/index';
import { Role } from '@app/_models';
import { RedirectAdminGuard } from '@core/index';

const accountModule = () => import('@features/accountsModule').then(x => x.AccountsModule);
const adminModule = () => import('@features/admin/admin.module').then(x => x.AdminModule);
const coursesModule = () => import('@features/coursesModule').then(x => x.CoursesModule);
const PM = () => import('@features/accountsModule/profile/profile.module').then(x => x.ProfileModule);
const PaymentModule = () => import('@features/coursesModule/payment').then(x => x.PaymentModule);
const EventModule = () => import('@features/eventsModule').then(x => x.EventModule);
const BlogModule = () => import('@features/blogModule/blog').then(x => x.BlogModule);
const claimModule = () => import('@features/claimModule').then(x => x.ClaimModule);
const FM = () => import('@features/featuresModule/feature/features.module').then(x => x.FeatureModule);


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [RedirectAdminGuard] , data : { breadcrumb : 'Home'  }},
    { path: 'account', loadChildren: accountModule },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'courses', loadChildren: coursesModule , data : { breadcrumb : 'Courses' , title : 'Courses' }},
    { path: 'profile', loadChildren: PM , canActivate : [AuthGuard] , data : { breadcrumb : 'Profile' , title : 'Profile'}},
    { path: 'pay', loadChildren: PaymentModule , canActivate : [AuthGuard], data : { breadcrumb : 'Payment', title : 'Payment' }},
    { path: 'event', loadChildren: EventModule , data : { breadcrumb : 'Event', title : 'Events' }},
    { path: 'blog', loadChildren: BlogModule},
    { path: 'claim', loadChildren: claimModule},
    { path: 'hello', loadChildren: FM , canActivate : [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
