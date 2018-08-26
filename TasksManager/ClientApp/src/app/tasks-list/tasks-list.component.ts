import {Component} from '@angular/core';
import {DataService} from '../services/data-service';
import {Task} from '../models/task';
import {ApiTask} from '../api-access/models/api-task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  providers: [DataService]
})
export class TasksListComponent {
  public tasks: Task[];

  constructor(private dataService: DataService) {
    this.dataService.getTasks()
                    .subscribe((data: Task[]) => this.tasks = data);
  }
}
