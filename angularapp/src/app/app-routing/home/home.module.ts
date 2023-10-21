import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullComponent } from './full/full.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeRoutingModule } from './home-routing.module';
import { CatalogosModule } from './catalogos/catalogos.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MaterialModule } from '../../../../src/app/material.module';



@NgModule({
  declarations: [
    FullComponent,
    SidebarComponent,
    HeaderComponent,
    FullComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CatalogosModule,
    MatSidenavModule,
    MatListModule,
    MaterialModule
  ],
  exports: [
    FullComponent
  ]
})
export class HomeModule { }
