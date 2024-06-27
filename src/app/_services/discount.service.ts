import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountTimerService {
  private endTime: Date;
  private _timeLeft: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  get timeLeft(): Observable<number> {
    return this._timeLeft.asObservable();
  }

  constructor() {
    this.endTime = new Date(Date.now() + 86000000); // Set the end time 24 hours from now
    this.startTimer();
  }

  private startTimer() {
    setInterval(() => {
      const now = new Date().getTime();
      const distance = this.endTime.getTime() - now;

      if (distance < 0) {
        this._timeLeft.next(0);
      } else {
        this._timeLeft.next(distance);
      }
    }, 1000);
  }
}
