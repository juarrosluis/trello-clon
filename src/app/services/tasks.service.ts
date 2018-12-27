import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasksApi = "http://localhost:1337/apitrello.herokuapp.com/tasks";
  private listTasksApi = "http://localhost:1337/apitrello.herokuapp.com/list/tasks";
  
  constructor(private httpClient: HttpClient) { }

  createTaskOnAList(data): Observable<any> {
    return this.httpClient.post<any>(this.tasksApi, data, httpOptions)
  }

  retrieveAllTasksOfAList(listID:number): Observable<any> {
    return this.httpClient.get<any>(this.listTasksApi + "/" + listID, httpOptions)
  }

  deleteAllTasksOfAList(listID:number){
    return this.httpClient.delete(this.tasksApi + "/" + listID, httpOptions);
  }

  retrieveTask(id:number): Observable<any> {
    return this.httpClient.get<any>(this.tasksApi + "/" + id, httpOptions)
  }

  updateTask(data, id): Observable<any> {
    return this.httpClient.put<any>(this.tasksApi + "/" + id, data, httpOptions)
  }

}