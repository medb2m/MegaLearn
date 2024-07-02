import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { LayoutComponent } from './layout';
import { DetailsComponent } from './details/details.component';
import { AuthGuard } from '@core/guards';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  
  {
    path: '', component: LayoutComponent,
    children: [
        { path: '', component: ListComponent },
        { path: 'chat', component: ChatComponent },
        { path: 'details/:id', component: DetailsComponent },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimRoutingModule { }
