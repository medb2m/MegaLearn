import { Component } from '@angular/core';

@Component({selector : 'sidebar', templateUrl: 'sidebar.component.html', styleUrls : ['../_assets/admin.css'] })
export class SideBarComponent { 
    isSidebarOpen: boolean = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log(this.isSidebarOpen)
  }
}