import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UserComponent } from './user/user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { CategoryComponent } from './category/category.component';
import { CaeateCategoryComponent } from './category/create-category/create-category.component';
import { CourseComponent } from './course/course.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, 
      children : [
        { path: 'user', component: UserComponent },
        { path: 'user/update/:id', component: UpdateUserComponent },
        { path: 'category', component: CategoryComponent },
        { path: 'category/create', component: CaeateCategoryComponent },
        { path: 'category/update/:id', component: CaeateCategoryComponent },
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
