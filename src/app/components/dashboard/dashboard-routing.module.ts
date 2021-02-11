import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { CaeateCategoryComponent } from './category/caeate-category/caeate-category.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { CourseComponent } from './course/course.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, 
      children : [
        { path: 'user', component: UserComponent },
        { path: 'category', component: CategoryComponent },
        { path: 'category/create', component: CaeateCategoryComponent },
        { path: 'category/:id', component: CategoryDetailComponent },
        { path: 'course', component: CourseComponent },
        { path: 'assignment', component: AssignmentComponent },
        { path: 'question', component: QuestionComponent },
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
