import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideBarComponent } from './sidebar';
import { LayoutComponent } from './layout';
import { OverviewComponent } from './navbar';
import { AuthGuard } from '@core/guards';

const FeatureModule = () => import('@features/admin').then(x => x.EntityModule);
const AccountsModule = () => import('@features/admin').then(x => x.AccountsModule);
const CoursesModule = () => import('@features/admin').then(x => x.CoursesModule);
const DashboardModule = () => import('@features/admin').then(x => x.DashboardModule);
const CategoriesModule = () => import('@features/admin').then(x => x.CategoriesModule);
const QuizModule = () => import('@features/admin').then(x => x.QuizModule);
<<<<<<< HEAD
=======
const ProfileModule = () => import('@features/accountsModule/profile').then(x => x.ProfileModule);
>>>>>>> 6fc3a2271eb8225e1dccda0dac38ac604ab21559


const routes: Routes = [
    //{ path: '', component: SideBarComponent, outlet: 'sidebar' },
    {
        path: '', component: LayoutComponent,
        children: [
            //{ path: '', redirectTo  : 'dashboard' },
            { path: 'dashboard', loadChildren: DashboardModule },
            { path: 'accounts', loadChildren: AccountsModule },
            { path: 'courses', loadChildren: CoursesModule },
            { path: 'categories', loadChildren: CategoriesModule },
            { path: 'feature', loadChildren: FeatureModule },
            { path: 'quiz', loadChildren: QuizModule },
<<<<<<< HEAD
            
=======
            { path: 'profile', loadChildren: ProfileModule },
>>>>>>> 6fc3a2271eb8225e1dccda0dac38ac604ab21559
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }