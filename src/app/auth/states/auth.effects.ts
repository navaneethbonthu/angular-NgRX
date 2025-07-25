import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { loginStart, loginSuccess } from './auth.actions';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private authservice: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authservice.login(action.email, action.password).pipe(
          map((data) => {
            return loginSuccess({ user: data });
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
}
