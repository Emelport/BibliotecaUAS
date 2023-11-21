import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FullComponent } from '../app/home/full/full.component';
import { WelcomeComponent } from '../app/home/welcome/welcome.component';
import { RduComponent } from '../app/home/rdu/rdu.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'home',
        component: FullComponent,
        children: [
            { path: '', redirectTo: 'welcome', pathMatch: 'full' }, // Redirigir de 'home' a 'home/welcome'
            { path: 'welcome', component: WelcomeComponent }, // Agregar una ruta para 'home/welcome'
            { path: 'rdu', component: RduComponent },
            // Si no esta logeado redirigir a login
            { path: '**', redirectTo: 'login' }

        ]
    },
];
