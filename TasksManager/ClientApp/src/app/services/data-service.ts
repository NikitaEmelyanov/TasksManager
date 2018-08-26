import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiTask} from '../api-access/models/api-task';

@Injectable()
export class DataService {
  private url = '/api/tasks';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getTasks() {
    return this.http.get(this.baseUrl + this.url);
  }

  getTaskById(id: number) {
    return this.http.post(this.baseUrl + this.url, id);
  }

  addTask(apiTask: ApiTask) {
    return this.http.post(this.baseUrl + this.url, apiTask);
  }
}
