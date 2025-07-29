import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  autoLogin,
  loginStart,
  loginSuccess,
  logout,
  signupStart,
  signupSuccess,
} from './auth.actions';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { getErrorMessage, getIsLoading } from 'src/app/shared/shared.selector';
import { setErrorMessage, setIsLoading } from 'src/app/shared/shared.actions';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private authservice: AuthService,
    private actions$: Actions,
    private router: Router,
    private store: Store
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        this.store.dispatch(setIsLoading({ value: true }));
        return this.authservice.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const loggedUser = this.authservice.fortmateUserData(data);
            this.authservice.saveUserInLocalStorage(loggedUser);
            return loginSuccess({ user: loggedUser, redirected: true });
          }),
          catchError((errorResponse) => {
            console.log('errorResponse', errorResponse);

            this.store.dispatch(setIsLoading({ value: false }));

            const errorMessage =
              this.authservice.getErrorMessage(errorResponse);

            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        this.store.dispatch(setIsLoading({ value: true }));
        return this.authservice.signup(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const signedUser = this.authservice.fortmateUserData(data);
            this.authservice.saveUserInLocalStorage(signedUser);
            return signupSuccess({ user: signedUser, redirected: true });
          }),
          catchError((errorResponse) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const errorMessage =
              this.authservice.getErrorMessage(errorResponse);
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  redirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          if (action.redirected) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false }
  );

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap(() => {
        const user = this.authservice.readUserInLocalStorage();
        return of(loginSuccess({ user, redirected: false }));
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        map(() => {
          this.authservice.logout();
          this.router.navigate(['/auth/login']);
        })
      );
    },
    { dispatch: false }
  );
}
