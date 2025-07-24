import { counterReducer } from '../counter/states/counter.reducer';
import { counterState } from '../counter/states/counter.state';
import { courseReducer } from '../courses/state/courses.reducer';
import { CoursesState } from '../courses/state/courses.state';

export interface AppState {
  counter: counterState;
  courses: CoursesState;
}

export const appReducer = {
  counter: counterReducer,
  courses: courseReducer,
};
