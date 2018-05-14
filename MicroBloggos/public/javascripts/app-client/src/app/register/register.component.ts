import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router }      from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user : User = {};
  
  constructor(private UserService: UserService, private router: Router) { } // /!\ ne reconnait pas l'object s'il n'est pas dans le construct

// TODO UTILISER LES TOKENS
//  TODO GERER LES ERREURS
  onRegister(){
    if(this.user){
      this.UserService.register(this.user).subscribe(
        response => {
          localStorage.setItem('isLogged', "true");  //Stocké sous forme de string dans le local storage
          localStorage.setItem('user', JSON.stringify(response.new_user));
          this.router.navigate(['']);
        },
        error => console.log(error.status)
      );
    }
  }

  ngOnInit() {
  }

}
