import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FIREBASE_API_KEY } from 'src/app/constants';
import { AuthResponse } from 'src/app/models/auth-response.model';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/store/app.state';
import { logout } from '../states/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timer: any;
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(email: string, password: string): Observable<AuthResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
    const body = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http.post<AuthResponse>(url, body);
  }

  signup(email: string, password: string): Observable<AuthResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
    const body = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http.post<AuthResponse>(url, body);
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
      case 'EMAIL_EXISTS':
        message = 'The email address is already in use by another account';
        break;

      default:
        message = errorResponse.error.error.message;
    }

    return message;
  }

  fortmateUserData(response: AuthResponse) {
    const formatedUserData: User = {
      accessToken: response.idToken,
      email: response.email,
      expiresAt: Date.now() + +response.expiresIn * 1000,
      userId: response.localId,
    };
    return formatedUserData;
  }

  saveUserInLocalStorage(user: User) {
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.autoLogout(user);
    } catch (error) {
      console.log(
        'Error occured while saveing the Current User in local storage'
      );
    }
  }

  readUserInLocalStorage() {
    try {
      const loggedUser = localStorage.getItem('currentUser');
      if (!loggedUser) {
        return null;
      }
      const user: User = JSON.parse(loggedUser);

      if (user.expiresAt < Date.now()) {
        localStorage.removeItem('currentUser');
        return null;
      }
      return user;
    } catch (error) {
      localStorage.removeItem('currentUser');
      return null;
    }
  }
  logout() {
    localStorage.removeItem('currentUser');
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  autoLogout(user: User) {
    const interval = user.expiresAt - Date.now();
    this.timer = setInterval(() => {
      this.store.dispatch(logout());
    }, interval);
  }
}
