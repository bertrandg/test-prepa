import {Routes} from '@angular/router';
import {HomeRouteComponent} from './components/home/home-route-component';
import {UsersRouteComponent} from './components/users/users-route-component';

export const routes: Routes = [
  {path: 'home', component: HomeRouteComponent},
  {path: 'users', component: UsersRouteComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];
