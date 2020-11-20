import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoComponent } from './pages/alumno/alumno.component';
import { CompareComponent } from './pages/compare/compare.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SupervisorComponent } from './pages/supervisor/supervisor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'supervisor',
    component: SupervisorComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'compare',
    component: CompareComponent
  },
  {
    path: 'alumno',
    component: AlumnoComponent
  },

  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
