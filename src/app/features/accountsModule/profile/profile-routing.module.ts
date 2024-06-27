import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout';
import { DetailsComponent } from './details';
import { UpdateComponent } from './update';

const routes: Routes = [
    {
<<<<<<< HEAD
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: DetailsComponent },
            { path: 'update', component: UpdateComponent }
=======
        path: '', component: LayoutComponent, data: { skipBreadcrumb: true },
        children: [
            { path: '', component: DetailsComponent , data : { breadcrumb : 'Details', title: 'Profile Details' } },
            { path: 'update', component: UpdateComponent , data : { breadcrumb : 'Settings', title: 'Profile Settings' } }
>>>>>>> 6fc3a2271eb8225e1dccda0dac38ac604ab21559
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }