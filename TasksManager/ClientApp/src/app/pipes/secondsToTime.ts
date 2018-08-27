import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime'
})

export class SecondsToTimePipe implements PipeTransform {
  times = {
    year: 31557600,
    month: 2629746,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  transform(seconds) {
    let time_string = '';
    let plural = '';
    for (const key in this.times) {
      if (Math.floor(seconds / this.times[key]) > 0) {
        if (Math.floor(seconds / this.times[key]) > 1) {
          plural = 's';
        } else {
          plural = '';
        }

        time_string += Math.floor(seconds / this.times[key]).toString() + ' ' + key.toString() + plural + ' ';
        seconds = seconds - this.times[key] * Math.floor(seconds / this.times[key]);

      }
    }
    if (time_string === '') {
      return '0';
    }
    return time_string;
  }
}
