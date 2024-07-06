import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { ClaimComponent } from './list/claim.component';
import { LayoutComponent } from './layout';
=======
import { ListComponent } from './list/list.component';
import { LayoutComponent } from './layout';
import { DetailsComponent } from './details/details.component';
import { AuthGuard } from '@core/guards';
>>>>>>> siwarMerge
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  
  {
    path: '', component: LayoutComponent,
    children: [
<<<<<<< HEAD
        { path: '', component: ClaimComponent },
        { path: 'chat', component: ChatComponent },
    ]
}
]
=======
        { path: '', component: ListComponent },
        { path: 'chat', component: ChatComponent },
        { path: 'details/:id', component: DetailsComponent },
    ]
}
];
>>>>>>> siwarMerge

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimRoutingModule { }
