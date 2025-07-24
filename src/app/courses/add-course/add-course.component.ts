import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { showCrateForm } from '../state/courses.actions';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent {
  constructor(private store: Store<AppState>) {}

  hideForm() {
    this.store.dispatch(showCrateForm({ value: false }));
  }
}
