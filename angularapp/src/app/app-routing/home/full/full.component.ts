import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.css']
})
export class FullComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Se ejecuta cuando se completa una navegación
        // Puedes realizar acciones aquí, por ejemplo, verificar la ruta actual
        console.log('Se ha cargado una nueva ruta:', event.url);
      }
    });

  }
}
