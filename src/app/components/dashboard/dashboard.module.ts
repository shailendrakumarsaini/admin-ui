import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './../../shared/navbar/navbar.component';
import { SidePanelComponent } from './../../shared/side-panel/side-panel.component';
import { FooterComponent } from './../../shared/footer/footer.component';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { CourseComponent } from './course/course.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    SidePanelComponent,
    FooterComponent,
    UserComponent,
    CategoryComponent,
    CourseComponent,
    AssignmentComponent,
    QuestionComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
