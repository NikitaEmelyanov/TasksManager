import {TaskStatus} from './task-status';

export class Task {
  constructor(public id?: number,
              public name?: string,
              public description?: string,
              public priority?: number,
              public status?: TaskStatus,
              public completion_time?: number,
              public creation_time?: number) { }
}
