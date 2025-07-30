import { Course } from 'src/app/models/course.model';

export interface CoursesState {
  courses: Course[];
  showForm: boolean;
  isEditMode: boolean;
  selectedCouse: Course;
}

export const initialState: CoursesState = {
  courses: [
    // {
    //   id: '1',
    //   title: 'Mastering Modern JavaScript',
    //   description:
    //     'A comprehensive course covering ES6+ features, asynchronous JavaScript, and front-end development essentials.',
    //   image: './assets/images/javascript.jpg',
    //   author: 'John Doe',
    //   price: 49.99,
    // },
    // {
    //   id: '2',
    //   title: 'Angular - From Zero to Hero',
    //   description:
    //     'Learn to build robust and scalable single-page applications with Angular, including components, services, routing, and state management.',
    //   image: './assets/images/javascript.jpg',
    //   author: 'Jane Smith',
    //   price: 59.99,
    // },
  ],
  showForm: false,
  isEditMode: false,
  selectedCouse: null,
};
