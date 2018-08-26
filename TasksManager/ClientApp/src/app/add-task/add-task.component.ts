import {Component} from '@angular/core';
import {DataService} from '../services/data-service';
import {Task} from '../models/task';
import {ApiTask} from '../api-access/models/api-task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  providers: [DataService]
})

export class AddTaskComponent {
  task: Task = new Task();

  constructor(private dataService: DataService) {}

  public save() {
    const task = this.toApiTask(this.task);
    this.dataService.addTask(task)
                    .subscribe(error => console.error(error));
  }

  private toApiTask(task: Task) {
    const timeInMilliseconds = Date.parse(task.time_to_complete);
    const timeNow = new Date().getTime();

    const timeToComplete = (timeInMilliseconds - timeNow) / 1000;
    return new ApiTask(task.name, task.description, task.priority, timeToComplete);
  }
}
