import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import {
  getErrorMessage,
  getIsLoading,
  getSharedState,
} from './shared/shared.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  showLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;

  title = 'angular-NgRX';

  ngOnInit(): void {
    this.showLoading$ = this.store.select(getIsLoading);
    this.errorMessage$ = this.store.select(getErrorMessage);
  }
}
