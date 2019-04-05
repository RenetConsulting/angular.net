import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const ROUTES: Array<Route> = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    /** public routes */
    { path: 'home', component: HomeComponent },
    { path: 'counter', loadChildren: './components/counter/counter.module#CounterModule' },
    { path: 'profile', loadChildren: './components/profile/profile.module#ProfileModule' },

    { path: '**', redirectTo: '/home' }
];