import {Injectable} from '@angular/core';
import {Location} from '@angular/common';

@Injectable()
export class LocationService {

  constructor(private location: Location) { }

  public goToCurrent() {
    this.location.go(this.location.path() + '#');
  }

  public goToId(id: number) {
    this.location.go(this.location.path() + '#/' + id);
  }

  public subscribe(func: () => any) {
    this.location.subscribe(() => func());
  }

  public getId() {
    const path = this.location.path(true);
    if (path.includes('#/')) {
      const id = parseInt(path.split('#/').pop(), 10);
      if ( id >= 0) {
        return id;
      }
      return -2;
    }
    return -1;
  }
}
