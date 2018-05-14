import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public user : User = JSON.parse(localStorage.getItem('user'));

  constructor(private UserService: UserService, private router : Router) { }

  onDisconnect(){
    this.UserService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
