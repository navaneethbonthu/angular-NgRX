import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../services/auth.service';
import { loginStart, signupStart } from '../states/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signUpForm: FormGroup;
  loggedInUser: User;

  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('test@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('test1234', [Validators.required]),
      // password: new FormControl(null, [Validators.required]),
    });
  }

  onFormSubmit() {
    const { email, password } = this.signUpForm.value;

    this.store.dispatch(signupStart({ email, password }));

    // console.log(this.loginForm.value);

    // this.authService.login(email, password).subscribe(
    //   (res) => {
    //     this.loggedInUser = res;
    //     console.log(this.loggedInUser);
    //   },
    //   (error) => {
    //     console.error('Login/Signup error:', error);
    //     console.error('Firebase API Error Details:', error.error);
    //   }
    // );
  }

  vaidateEmail() {
    const emailControl = this.signUpForm.get('email');
    if (emailControl.touched && !emailControl.valid) {
      if (emailControl.errors['required']) {
        return 'email is required';
      }
      if (emailControl.errors['email']) {
        return 'email  is not valid';
      }
    }
    return '';
  }

  validatePassword() {
    const passwordControl = this.signUpForm.get('password');
    if (passwordControl.touched && !passwordControl.valid) {
      if (passwordControl.errors['required']) {
        return 'password is required';
      }
    }
    return '';
  }
}
