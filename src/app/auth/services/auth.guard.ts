import { inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getLoggedUser } from '../states/auth.selector';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store: Store<AppState> = inject(Store);
  const router: Router = inject(Router);

  return store.select(getLoggedUser).pipe(
    map((user) => {
      if (!user) {
        return router.createUrlTree(['auth', 'login']);
      } else {
        return true;
      }
    })
  );
};
