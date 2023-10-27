import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FullComponent } from './home/full/full.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { RduComponent } from './home/rdu/rdu.component';
import { FooterComponent } from './footer/footer.component';
 

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: FullComponent,
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' }, // Redirigir de 'home' a 'home/welcome'
      { path: 'welcome', component: WelcomeComponent }, // Agregar una ruta para 'home/welcome'
      { path: 'rdu', component: RduComponent },
      // { path: 'catalogo-form/:nombre', component: FormularioComponent },
      // { path: 'capturas', component: MenuCapturasComponent },
      // { path: 'capturas-form/:nombre', component: FormDetalleComponent },
      // Otras rutas para componentes en el router-outlet "sidebarOutlet"
    ]

  },
];

@NgModule({
  declarations: [
    LoginComponent,
    NotFoundComponent,
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
