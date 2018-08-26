import {Component} from '@angular/core';
import {DataService} from '../services/data-service';
import {Task} from '../models/task';

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

    this.initCountdown();
  }

  private initCountdown() {
    setInterval(() => {
      this.tasks.forEach(task => {
        if (task.time_to_complete > 0) {
          task.time_to_complete--;
        }
      });
    }, 1000);
  }
}
