import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loggedInUser: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('test@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('test1234', [Validators.required]),
      // password: new FormControl(null, [Validators.required]),
    });
  }

  onFormSubmit() {
    const { email, password } = this.loginForm.value;
    console.log(this.loginForm.value);

    this.authService.login(email, password).subscribe(
      (res) => {
        this.loggedInUser = res;
        console.log(this.loggedInUser);
      },
      (error) => {
        // IMPORTANT: Log the error.error to see Firebase's specific message
        console.error('Login/Signup error:', error);
        console.error('Firebase API Error Details:', error.error);
      }
    );
  }

  vaidateEmail() {
    const emailControl = this.loginForm.get('email');
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
    const passwordControl = this.loginForm.get('password');
    if (passwordControl.touched && !passwordControl.valid) {
      if (passwordControl.errors['required']) {
        return 'password is required';
      }
    }
    return '';
  }
}
