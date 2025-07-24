import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  createCourse,
  setEditMode,
  setSelectedCourse,
  showForm,
  updateCourse,
} from '../state/courses.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getEditMode, getSelectedCourse } from '../state/courses.selector';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  courseForm: FormGroup;
  editMode: boolean = false;
  course: Course = null;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(getEditMode).subscribe((value) => {
      this.editMode = value;
    });
    this.init();
    this.subscribeToSelectedCourse();
  }

  init() {
    this.courseForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(5000),
      ]),
      author: new FormControl(null, [Validators.required]),
      price: new FormControl(null),
      image: new FormControl(null),
    });
  }

  subscribeToSelectedCourse() {
    this.store.select(getSelectedCourse).subscribe((data) => {
      this.course = data;
    });

    if (this.editMode && this.course) {
      this.courseForm.patchValue(this.course);
    } else {
      this.courseForm.reset();
    }
  }

  hideForm() {
    this.store.dispatch(showForm({ value: false }));
  }

  onCreateOrUpdateCourse() {
    if (!this.courseForm.valid) {
      return;
    }

    if (this.editMode) {
      const editedCourse: Course = {
        id: this.course.id,
        title: this.courseForm.value.title,
        description: this.courseForm.value.description,
        author: this.courseForm.value.author,
        price: this.courseForm.value.price,
        image: this.courseForm.value.image,
      };
      this.store.dispatch(updateCourse({ course: editedCourse }));
    } else {
      this.store.dispatch(createCourse({ course: this.courseForm.value }));
    }

    this.store.dispatch(showForm({ value: false }));
    this.store.dispatch(setEditMode({ editMode: false }));
    this.store.dispatch(setSelectedCourse({ course: null }));
  }

  showTitleValidationError() {
    const titleControl = this.courseForm.get('title');
    if (titleControl.touched && !titleControl.valid) {
      if (titleControl.errors['required']) {
        return 'Title is required';
      }
      if (titleControl.errors['minlength']) {
        return 'Title must be above 4 charectors';
      }
      if (titleControl.errors['maxl ength']) {
        return 'Title must be below 100 charectors';
      }
    }
    return '';
  }

  showDescriptionValidationError() {
    const desControl = this.courseForm.get('description');
    if (desControl.touched && !desControl.valid) {
      if (desControl.errors['required']) {
        return 'Description is required';
      }
      if (desControl.errors['minlength']) {
        return 'Description must be above 4 charectors';
      }
      if (desControl.errors['maxl ength']) {
        return 'Description must be below 100 charectors';
      }
    }
    return '';
  }

  showAuthorValidationError() {
    const authorControl = this.courseForm.get('author');
    if (authorControl.touched && !authorControl.valid) {
      if (authorControl.errors['required']) {
        return 'Author is required';
      }
    }
    return '';
  }
}
