import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout';
import { EventListComponent } from './list';
import { EventdetailsComponent } from './details';
import { VideoChatComponent } from './video-chat/video-chat.component';

const routes: Routes = [
  
  {
    path: '', component: LayoutComponent,
    children: [
        { path: '', component: EventListComponent },
        { path: 'myevents', component: EventListComponent },
        { path: 'details/:id', component: EventdetailsComponent  },
        { path: 'video/:id', component: VideoChatComponent  },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
