import { HttpClient } from '@angular/common/http';
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
}
