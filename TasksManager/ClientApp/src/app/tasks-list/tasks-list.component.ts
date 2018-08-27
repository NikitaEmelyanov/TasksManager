import {Component} from '@angular/core';
import {DataService} from '../services/data-service';
import {Task} from '../models/task';
import {TaskStatus} from '../models/task-status';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  providers: [DataService]
})

export class TasksListComponent {
  public apiTasks: Task[];
  public domainTasks: Task[];
  public filter = 'all';

  private countdownIntervalId: number;

  constructor(private dataService: DataService) {
    this.loadTasks();
  }

  public setFilter(status: string) {
    this.filter = status;
  }

  public loadTasks() {
    this.dataService.getTasks()
                    .subscribe((data: Task[]) => {
                      this.apiTasks = data;
                      this.domainTasks = data.map(x => Object.assign({}, x));
                      this.extractCompletionTime();
                      this.initCountdown();
                    });
  }

  public completeTask(id: number) {
    this.updateStatus(id, TaskStatus.Completed);
  }

  public removeTask(id: number) {
    this.updateStatus(id, TaskStatus.Removed);
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
      const completionTime = Math.floor(task.completion_time - Date.now() / 1000);
      if (completionTime < 0) {
        task.completion_time = 0;
      } else {
        task.completion_time = completionTime;
      }
    });
  }

  private initCountdown() {
    clearInterval(this.countdownIntervalId);
    this.countdownIntervalId = setInterval(() => {
      this.domainTasks.forEach(task => {
        if (task.completion_time > 0) {
          task.completion_time--;
        }
      });
    }, 1000);
  }
}
