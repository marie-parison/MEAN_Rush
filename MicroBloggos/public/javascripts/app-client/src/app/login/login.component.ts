import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router }      from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : User = {};
  
  constructor(private UserService: UserService, private router: Router) { } // /!\ ne reconnait pas l'object s'il n'est pas dans le construct

// TODO UTILISER LES TOKENS
// TODO GERER LES ERREURS
  onConnect(){
    if(this.user){
      this.UserService.login(this.user).subscribe(
        response => {
          localStorage.setItem('isLogged', "true");  // Stocké sous forme de string dans le local storage
          console.log(response.user)
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['']);
        }, 
        error => console.log(error.status)
      );
    }
  }

  ngOnInit() {
  }

}