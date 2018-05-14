import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Need HttpClient
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public update(user_id : String, params : Object):  Observable<any> {
    return this.http.put("http://localhost:3000/users/" + user_id, params, httpOptions);
  }

  public getAll(): Observable<any> {
    return this.http.get("http://localhost:3000/users");
  }

  public getOne(user_id : String): Observable<User> {
    return this.http.get("http://localhost:3000/users/" + user_id);
  }
  
  public register (user : User): Observable<any> {
    return this.http.post("http://localhost:3000/register", user, httpOptions);
  }

  // TODO SE RENSEIGNER SUR LES OBSERVABLES ET LES PROMISES
  public login (user : User): Observable<any> { 
    return this.http.post("http://localhost:3000/login", user, httpOptions);
  }

  public logout(): void {
    localStorage.setItem('isLogged', "false");
  }

}