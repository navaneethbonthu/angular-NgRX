import { Component, Input } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { AppState } from 'src/app/store/app.state';
import {
  createCourse,
  deleteCourse,
  setEditMode,
  setSelectedCourse,
  showForm,
} from '../state/courses.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent {
  constructor(private store: Store<AppState>) {}

  @Input() course: Course | null = null;

  onEditCourse() {
    this.store.dispatch(showForm({ value: true }));
    this.store.dispatch(setEditMode({ editMode: true }));
    this.store.dispatch(setSelectedCourse({ course: this.course }));
  }

  deleteCourse() {
    this.store.dispatch(deleteCourse({ id: this.course.id }));
  }
}
