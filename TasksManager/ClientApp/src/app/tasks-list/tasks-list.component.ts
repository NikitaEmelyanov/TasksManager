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
                    .subscribe((data: Task[]) => this.OnTasksLoad(data));
  }

  public completeTask(id: number) {
    this.tasks.filter(task => {
      if (task.id === id) {
        task.status = TaskStatus.Completed;
        this.dataService.updateTask(id, task);
      }
    });
  }

  private OnTasksLoad(data: Task[]) {
    this.tasks = data;
    this.extractCompletionTime();
    this.initCountdown();
  }

  private extractCompletionTime() {
    this.tasks.forEach(task =>  {
      const completionTime = task.completion_time - task.creation_time;
      if (completionTime < 0) {
        task.completion_time = 0;
      } else {
        task.completion_time = completionTime;
      }
    });
  }

  private initCountdown() {
    setInterval(() => {
      this.tasks.forEach(task => {
        if (task.completion_time > 0) {
          task.completion_time--;
        }
      });
    }, 1000);
  }
}
