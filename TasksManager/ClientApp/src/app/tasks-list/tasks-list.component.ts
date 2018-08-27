import {Component} from '@angular/core';
import {DataService} from '../services/data-service';
import {Task} from '../models/task';
import {TaskStatus} from '../models/task-status';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  providers: [DataService]
})

export class TasksListComponent {
  public apiTasks: Task[];
  public domainTasks: Task[];
  public filter = 'all';

  constructor(private dataService: DataService) {
    this.dataService.getTasks()
                    .subscribe((data: Task[]) => this.OnTasksLoad(data));
  }

  public setFilter(status: string) {
    this.filter = status;
  }

  public completeTask(id: number) {
    this.updateStatus(id, TaskStatus.Completed);
  }

  public removeTask(id: number) {
    this.updateStatus(id, TaskStatus.Removed);
  }

  private OnTasksLoad(data: Task[]) {
    this.apiTasks = data;
    this.domainTasks = data.map(x => Object.assign({}, x));
    this.extractCompletionTime();
    this.initCountdown();
  }

  private updateStatus(id: number, status: TaskStatus) {
    const toRemoveTask = this.apiTasks.find(task => task.id === id);

    toRemoveTask.status = status;
    this.dataService.updateTask(id, toRemoveTask).subscribe(() => {
      this.domainTasks.find(task => task.id === id).status = status;
    });
  }

  private extractCompletionTime() {
    this.domainTasks.forEach(task =>  {
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
      this.domainTasks.forEach(task => {
        if (task.completion_time > 0) {
          task.completion_time--;
        }
      });
    }, 1000);
  }
}
