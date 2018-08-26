export class Task {
  constructor(public name?: string,
              public description?: string,
              public priority?: number,
              public time_to_complete?: number,
              public creation_time?: Date) { }
}
