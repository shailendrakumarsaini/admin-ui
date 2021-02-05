import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, 
      children : [
        { path: 'user', component: UserComponent },
        { path: '**', redirectTo:'user', pathMatch:'full' }
      ]
    },
    { path: '**', redirectTo:'user', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
