import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { AlertComponent, FooterComponent, NavbarComponent } from './components';
import { RouterModule } from '@angular/router';
import { ListComponent } from './components/list';
<<<<<<< HEAD
=======
import { BreadcrumbComponent } from './components/breadcrumb';
import { SocketService } from '@app/_services/socket.service';

@NgModule({
  declarations: [
    AlertComponent,
    NavbarComponent,
    FooterComponent,
<<<<<<< HEAD
=======
    BreadcrumbComponent,
>>>>>>> 6fc3a2271eb8225e1dccda0dac38ac604ab21559
    ListComponent,
    SearchPipe,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    AlertComponent,
    NavbarComponent,
    FooterComponent,
<<<<<<< HEAD
=======
    BreadcrumbComponent,
>>>>>>> 6fc3a2271eb8225e1dccda0dac38ac604ab21559
    ListComponent,
    SearchPipe,
    TruncatePipe
  ]
})
export class SharedModule { }
