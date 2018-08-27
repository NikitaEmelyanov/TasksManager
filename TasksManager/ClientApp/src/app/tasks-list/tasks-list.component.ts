import {Component} from '@angular/core';
import {DataService} from '../services/data-service';
import {Task} from '../models/task';
import {TaskStatus} from '../models/task-status';
import {LocationService} from '../services/location-service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  providers: [DataService , LocationService]
})

export class TasksListComponent {
  TaskStatus = TaskStatus;
  public apiTasks: Task[];
  public domainTasks: Task[];
  public selectedTask: Task = new Task();
  public isTaskDetailsVisible = false;
  public filter = 'all';

  private countdownIntervalId: number;
  private removeButtonClicked: boolean;

  constructor(private dataService: DataService, private locationService: LocationService) {
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
                      this.showDetailsIfNeeded();
                      this.locationService.subscribe(() => this.showDetailsIfNeeded());
                    });
  }

  public completeTask(id: number) {
    this.updateStatus(id, TaskStatus.Completed);
  }

  public removeTask(id: number) {
    this.removeButtonClicked = true;
    this.updateStatus(id, TaskStatus.Removed);
  }

  public onTaskClick(task: Task) {
    if (this.removeButtonClicked) {
      this.locationService.goToCurrent();
      this.removeButtonClicked = false;
      this.isTaskDetailsVisible = false;
      this.selectedTask = new Task();
    } else {
      this.locationService.goToId(task.id);
      this.selectedTask = task;
      this.isTaskDetailsVisible = true;
    }
  }

  private showDetailsIfNeeded() {
    const id = this.locationService.getId();
    if (id > 0) {
      this.selectedTask = this.domainTasks.find(task => task.id === id);
      this.isTaskDetailsVisible = true;
    }
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
