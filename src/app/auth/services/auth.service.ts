import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FIREBASE_API_KEY } from 'src/app/constants';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
    const body = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http.post<User>(url, body);
  }

  getErrorMessage(errorResponse: HttpErrorResponse) {
    let message = 'An unknown error occured';

    if (!errorResponse.error || !errorResponse.error.error) {
      return message;
    }

    switch (errorResponse.error.error.message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        message = 'Enter correct email and password';
        break;
      case 'EMAIL_NOT_FOUND':
        message = 'This email does not exists';
        break;
      case 'INVALID_PASSWORD':
        message =
          'The password is invalid or the user does not have a password';
        break;
      case 'USER_DISABLED':
        message = 'The user account has been disabled by an administrator.';
        break;

      default:
        message = errorResponse.error.error.message;
    }

    return message;
  }
}
