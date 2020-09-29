import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TimeUtils {
  constructor() {}

  formatSecondsIntoMinituesAndSeconds(timeInSeconds: number) {
    const minutes = Math.floor(timeInSeconds / 60);
    let minutesInString = '';
    if (minutes < 10) {
      minutesInString = `0${minutes}`;
    } else {
      minutesInString = minutes.toString(10);
    }
    const seconds = timeInSeconds % 60;
    let secondsInString = '';
    if (seconds < 10) {
      secondsInString = `0${seconds}`;
    } else {
      secondsInString = seconds.toString(10);
    }
    return `${minutesInString}:${secondsInString}`;
  }
}
