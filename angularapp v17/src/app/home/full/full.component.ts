import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-full',
  standalone: true,
  imports: [CommonModule,HeaderComponent,SidebarComponent,RouterOutlet],
  templateUrl: './full.component.html',
  styleUrl: './full.component.scss'
})
export class FullComponent   {
  /*Marcar cuando el usuario navegue a otra pagina */
  constructor(private routerOutlet: RouterOutlet) {
    console.log("FullComponent");
  }
}
