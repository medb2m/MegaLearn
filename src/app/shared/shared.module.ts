import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { AlertComponent, FooterComponent, NavbarComponent } from './components';
import { RouterModule } from '@angular/router';
import { ListComponent } from './components/list';

@NgModule({
  declarations: [
    AlertComponent,
    NavbarComponent,
    FooterComponent,
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
    ListComponent,
    SearchPipe,
    TruncatePipe
  ]
})
export class SharedModule { }
