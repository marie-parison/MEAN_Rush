import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Message } from './message';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Need HttpClient

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class MessagesService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get("http://localhost:3000/messages");
  }

  public create(message: Message): Observable<any> {
    return this.http.post("http://localhost:3000/messages", message, httpOptions);
  }

  public update(message: Message): Observable<any> {
    return this.http.put("http://localhost:3000/messages/" + message._id, message, httpOptions);
  }

  public delete(message: Message): Observable<any> {
    return this.http.delete("http://localhost:3000/messages/" + message._id, httpOptions);
  }

}