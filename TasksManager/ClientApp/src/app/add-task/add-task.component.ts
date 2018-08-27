import {Component} from '@angular/core';
import {DataService} from '../services/data-service';
import {Task} from '../models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  providers: [DataService]
})

export class AddTaskComponent {
  task: Task = new Task();
  timeToComplete: string;

  constructor(private dataService: DataService) {}

  public save() {
    this.task.completion_time = this.toCompletionTime(this.timeToComplete);
    this.dataService.addTask(this.task)
                    .subscribe(error => console.error(error));
  }

  private toCompletionTime(time: string) {
    return new Date(time).getTime() / 1000;
  }
}
