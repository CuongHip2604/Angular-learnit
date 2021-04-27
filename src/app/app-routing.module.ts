import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './containers/container/container.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { P404Component } from './views/errors/404.component';
import { P500Component } from './views/errors/500.component';

const routes: Routes = [
  {
    path: '404',
    component: P404Component,
    data: {
      title: '404 Not Found',
    },
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: '500 Error',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register',
    },
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: ContainerComponent,
    data: {
      title: 'Home',
    },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./containers/core.module').then((m) => m.CoreModule),
  },
  { path: '**', component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
