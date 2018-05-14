import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public user: User = JSON.parse(localStorage.getItem('user'));
  public user_profil: User;
  public edition_mode : Boolean;

  public onEdit(){
    this.edition_mode = true;
  }

  backToProfil() {
    this.user_profil = JSON.parse(localStorage.getItem('user'));
    this.edition_mode = false;
  }

  constructor(private UserService: UserService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe(params => {
      this.UserService.getOne(params['id']).subscribe(
        response => {
          this.user_profil = response;
        });
    });
  }
}