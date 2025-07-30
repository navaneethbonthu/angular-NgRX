import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { getCourses, getShowForm } from './state/courses.selector';
import {
  readCourses,
  // setEditMode,
  showForm,
} from './state/courses.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> | null = null;
  showForm$: Observable<boolean> | null = null;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.courses$ = this.store.select(getCourses);
    this.showForm$ = this.store.select(getShowForm);
    this.store.dispatch(readCourses());
  }

  showCreateForm() {
    // this.store.dispatch(setEditMode({ editMode: false }));
    this.router.navigateByUrl('/courses?edit=false');
    this.store.dispatch(showForm({ value: true }));
  }
}
