import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout';
import { DetailsComponent } from './details';
import { UpdateComponent } from './update';

const routes: Routes = [
    {
        path: '', component: LayoutComponent, data: { skipBreadcrumb: true },
        children: [
            { path: '', component: DetailsComponent , data : { breadcrumb : 'Details', title: 'Profile Details' } },
            { path: 'update', component: UpdateComponent , data : { breadcrumb : 'Settings', title: 'Profile Settings' } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }