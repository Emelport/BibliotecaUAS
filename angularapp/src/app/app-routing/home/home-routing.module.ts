import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuCatalogosComponent } from './catalogos/menu-catalogos/menu-catalogos.component';



const routes: Routes = [
  { path: 'catalogos', component: MenuCatalogosComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class HomeRoutingModule { }
