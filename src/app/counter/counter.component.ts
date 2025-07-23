import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent {
  counter: number = 0;

  incrementCounter() {
    this.counter++;
  }
  decrementCounter() {
    this.counter--;
  }
  resetCounter() {
    this.counter = 0;
  }
}
