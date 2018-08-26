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

  constructor(private dataService: DataService) {}

  public save() {
    this.dataService.addTask(this.task);
  }
}
