import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { MessagesService } from '../messages.service';
import { Message } from '../message';
import { SocketService } from '../socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input("user") user: User;
  public user_profil : String;
  public message: Message = {};
  public messages: Message[];

  // TODO GESTION DES ERREURS
  public error;

  constructor(private SocketService: SocketService, private MessagesService: MessagesService, private UserService: UserService, private ActivatedRoute: ActivatedRoute) { }

  Create() {
    if (this.message) {
      this.message.user_id = this.user._id;
      this.MessagesService.create(this.message).subscribe(
        response => {
          this.SocketService.send("add_message", response);
          this.message = {};
        },
        error => {
          this.error = "Empty field";
          console.log(error.status)
        }
      );
    } else {
      // EMPTY FIELD !
    }
  }

  Update(message: Message) {

    var new_content = prompt("Edit message", message.content);

    if (new_content != null) {
      message.content = new_content;
      this.MessagesService.update(message).subscribe(
        response => {
          this.SocketService.send("update_message", response);
        },
        error => console.log(error.status)
      );
    }
  }

  Delete(message: Message) {

    this.MessagesService.delete(message).subscribe(
      response => {
        this.SocketService.send("delete_message", message);
      },
      error => console.log(error.status)
    );
  }

  ngOnInit() {
    this.MessagesService.getAll().subscribe(
      response => {
        this.messages = response;
      },
    );

    this.SocketService.initSocket();
    
    this.SocketService.onMessage().subscribe(response => {
      switch (response.action) {
        case "add_message":
          this.messages.unshift(response.message);
          break;
        case "update_message":
          // TODO TROUVER COMMENT MODIFIER LA VALEUR DE L'OBJECT
          break;
        case "delete_message":
          this.messages = this.messages.filter(messages => messages._id != response.message._id);
          break;
      }
    });

    this.ActivatedRoute.params.subscribe(params => {
        this.user_profil = params['id'];
    });
  }

}