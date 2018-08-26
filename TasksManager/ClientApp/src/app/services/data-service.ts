import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from '../models/task';

@Injectable()
export class DataService {
  private url = '/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(this.url);
  }

  getTaskById(id: number) {
    return this.http.post(this.url, id);
  }

  addTask(task: Task) {
    return this.http.post(this.url, task);
  }
}
