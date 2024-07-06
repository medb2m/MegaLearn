import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { LayoutComponent } from './layout';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { SharedModule } from '@app/shared';
import { TakeQuizComponent } from './take-quiz';
import { certificatesComponent } from './certificates';
import { PlyrModule } from 'ngx-plyr';

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    MyCoursesComponent,
    LayoutComponent,
    VideoplayerComponent,
    TakeQuizComponent,
    certificatesComponent
  
  ],
  exports : [
    ListComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PlyrModule,
  ]
})
export class CoursesModule { }
