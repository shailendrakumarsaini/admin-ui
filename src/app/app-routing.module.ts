import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard, AuthGuard } from './services/auth.guard';

const routes: Routes = [
    { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule), canActivate: [ LoginGuard ]},
    { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [ AuthGuard ] },
    { path: '**', redirectTo:'auth', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
