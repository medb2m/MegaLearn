import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout';
import { EventListComponent } from './list';
import { EventdetailsComponent } from './details';
import { VideoChatComponent } from './video-chat/video-chat.component';
import { MyeventsComponent } from './myevents/myevents.component';

const routes: Routes = [
  
  {
    path: '', component: LayoutComponent,
    children: [
        { path: '', component: EventListComponent },
        { path: 'myevents', component: MyeventsComponent },
        { path: 'details/:id', component: EventdetailsComponent  },
<<<<<<< HEAD
        { path: 'meeting/:id', component: VideoChatComponent  },
=======
        { path: 'video/:id', component: VideoChatComponent  },
>>>>>>> siwarMerge
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
