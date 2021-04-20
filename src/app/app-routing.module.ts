import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as components from './components';

const routes: Routes = [
  { path: 'home', component: components.MovieListComponent },
  { path: 'favorites', component: components.FavmoviesComponent },
  { path: 'signup', component: components.SignupComponent },
  { path: 'signin', component: components.SigninComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: components.NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
