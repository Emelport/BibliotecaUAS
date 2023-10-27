import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullComponent } from './full/full.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/header/header.component';
import { CatalogosModule } from './catalogos/catalogos.module';
import { MaterialModule } from '../../../../src/app/material.module';
import { RduComponent } from './rdu/rdu.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
    FullComponent,
    SidebarComponent,
    HeaderComponent,
    FullComponent,
    RduComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    CatalogosModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  exports: [
    FullComponent
  ]
})
export class HomeModule { }
