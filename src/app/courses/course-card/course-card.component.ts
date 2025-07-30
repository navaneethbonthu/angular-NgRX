import { Component, Input } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { AppState } from 'src/app/store/app.state';
import {
  createCourse,
  deleteCourse,
  // setEditMode,
  // setSelectedCourse,
  showForm,
} from '../state/courses.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent {
  constructor(private store: Store<AppState>, private router: Router) {}

  @Input() course: Course | null = null;

  onEditCourse() {
    this.store.dispatch(showForm({ value: true }));
    // this.store.dispatch(setEditMode({ editMode: true }));
    // this.store.dispatch(setSelectedCourse({ course: this.course }));
    this.router.navigateByUrl(`/courses?id=${this.course.id}&edit=true`);
  }

  deleteCourse() {
    this.store.dispatch(deleteCourse({ id: this.course.id }));
  }

  showCourseDetails() {
    this.router.navigate(['courses', 'course', this.course.id]);
  }
}
