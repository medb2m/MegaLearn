import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimComponent } from './list/claim.component';
import { LayoutComponent } from './layout';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  
  {
    path: '', component: LayoutComponent,
    children: [
        { path: '', component: ClaimComponent },
        { path: 'chat', component: ChatComponent },
    ]
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimRoutingModule { }
