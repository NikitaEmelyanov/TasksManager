import { Component, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html'
})

export class AddTaskComponent {
  private task: Task;
  private http: HttpClient;

  public addTask() {
    /**this.http.post(this.baseUrl + 'api/TasksStorage', JSON.stringify(this.task));**/
  }
}

interface Task {
  name: string;
  description: string;
  priority: string;
  timeToComplete: string;
}
