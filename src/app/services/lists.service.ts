import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  private listsApi = "http://localhost:1337/apitrello.herokuapp.com/list";
  
  constructor(private httpClient: HttpClient) { }

  createList(data): Observable<any> {
    return this.httpClient.post<any>(this.listsApi, data, httpOptions)
  }

  updateList(data, id): Observable<any> {
    return this.httpClient.put<any>(this.listsApi + "/" + id, data, httpOptions)
  }

  retrieveOneList(id): Observable<any> {
    return this.httpClient.get<any>(this.listsApi + "/" + id, httpOptions)
  }

  retrieveAllLists(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.listsApi, httpOptions)
  }

  deleteList(id:number){
    return this.httpClient.delete(this.listsApi + "/" + id, httpOptions);
  }

}
