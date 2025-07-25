import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { courseReducer } from './state/courses.reducer';
import { COURSES_STATE } from '../constants';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
  },
];

@NgModule({
  declarations: [CoursesComponent, CourseCardComponent, AddCourseComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(COURSES_STATE, courseReducer),
  ],
  exports: [],
})
export class CoursesModule {}
