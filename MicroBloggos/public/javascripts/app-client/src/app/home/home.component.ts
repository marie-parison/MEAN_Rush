import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user : User = JSON.parse(localStorage.getItem('user'));
  public users : User[];
  
  constructor(private UserService: UserService) { }

  Follow(user : User){
    this.UserService.update(this.user._id, {following : user._id}).subscribe(
      response => {
        this.user = response;
        localStorage.setItem('user', JSON.stringify(response));
      });
  }

  ngOnInit() {
    this.UserService.getAll().subscribe(
      response => {
        this.users = response.filter(user => user != this.user);
      },
    );
  }
}