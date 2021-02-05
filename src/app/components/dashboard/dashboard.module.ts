import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './../../shared/navbar/navbar.component';
import { SidePanelComponent } from './../../shared/side-panel/side-panel.component';
import { FooterComponent } from './../../shared/footer/footer.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    SidePanelComponent,
    FooterComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
