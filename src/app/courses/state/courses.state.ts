import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Course } from 'src/app/models/course.model';

export const courseAdapter = createEntityAdapter<Course>({
  selectId: (course: Course) => course.id,
  sortComparer: sortByTitle,
});

export interface CoursesState extends EntityState<Course> {
  showForm: boolean;
  loaded: boolean;
}

export const initialState: CoursesState = courseAdapter.getInitialState({
  showForm: false,
  loaded: false,
});

export function sortByTitle(a: Course, b: Course): number {
  return a.title.localeCompare(b.title);
}
