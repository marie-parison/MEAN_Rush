import { Injectable } from '@angular/core';
import { Message } from './message';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  private socket;

  constructor() { }

  public initSocket(): void {
    this.socket = io("http://localhost:3000");
  }

  public send(action, message: Message): void {
    this.socket.emit(action, message);
  }

  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('add_message', (data) => {
        observer.next({action : "add_message", message : data});
      })
      this.socket.on('update_message', (data) => {
        observer.next({action : "update_message", message : data});
      })
      this.socket.on('delete_message', (data) => {
        observer.next({action : "delete_message", message : data});
      })
    });
  }
}