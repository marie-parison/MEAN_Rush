import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input("user") user: User;
  @Output() editionEnded = new EventEmitter();
  public updated_user: User;

  onEdit() {
    console.log(this.updated_user)
    this.UserService.update(this.user._id, this.updated_user).subscribe(
      response => {
        localStorage.setItem('user', JSON.stringify(response));
        this.editionEnded.emit();
      });
  }

  onCancel() {
    this.editionEnded.emit();
  }

  constructor(private UserService: UserService) { }

  ngOnInit() {
    this.updated_user = this.user;
  }

}