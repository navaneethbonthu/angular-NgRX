import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { counterState } from '../states/counter.state';
import { getCounter } from '../states/counter.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-value',
  templateUrl: './counter-value.component.html',
  styleUrls: ['./counter-value.component.css'],
})
export class CounterValueComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {}

  counter$: Observable<number> | null = null;

  ngOnInit(): void {
    this.counter$ = this.store.select(getCounter);
  }

  ngOnDestroy(): void {}
}
