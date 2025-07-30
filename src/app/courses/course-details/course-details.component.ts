import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { AppState } from 'src/app/store/app.state';
import { getCourseByIdParams } from '../state/courses.selector';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  constructor(
    // private activeRoute: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {}
  id: string | null = null;
  selectedCourse$: Observable<Course> | null = null;

  ngOnInit(): void {
    // const id = this.activeRoute.snapshot.paramMap.get('id');
    this.selectedCourse$ = this.store.select(getCourseByIdParams);
  }
  onBackToCourses() {
    this.router.navigate(['courses']);
  }
}
