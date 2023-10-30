import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarVisible = true; // La barra lateral está inicialmente visible
  showSubMenuName: string | null = null;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible; // Alternar el estado
  }

  showSubMenu(option: string) {
    this.showSubMenuName = option;
  }
  
  hideSubMenu() {
    this.showSubMenuName = null;
  }

  
}
