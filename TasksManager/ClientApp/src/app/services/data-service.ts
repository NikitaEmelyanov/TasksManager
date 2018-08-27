import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Task} from '../models/task';

@Injectable()
export class DataService {
  private url = '/api/tasks';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getTasks() {
    return this.http.get(this.baseUrl + this.url);
  }

  updateTask(id: number, task: Task) {
    return this.http.put(this.baseUrl + this.url + '/' + task.id, task);
  }

  addTask(task: Task) {
    return this.http.post(this.baseUrl + this.url, task);
  }
}
