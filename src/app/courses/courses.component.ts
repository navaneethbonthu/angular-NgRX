import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { getCourses, getShowForm } from './state/courses.selector';
import { setEditMode, showForm } from './state/courses.actions';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> | null = null;
  showForm$: Observable<boolean> | null = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.courses$ = this.store.select(getCourses);
    this.showForm$ = this.store.select(getShowForm);
  }

  showCreateForm() {
    this.store.dispatch(setEditMode({ editMode: false }));
    this.store.dispatch(showForm({ value: true }));
  }
}
