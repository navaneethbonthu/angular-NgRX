import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { getLoggedUser } from '../auth/states/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  loggedUser$: Observable<User>;

  ngOnInit(): void {
    this.loggedUser$ = this.store.select(getLoggedUser);
  }
}
