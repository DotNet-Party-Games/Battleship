import { Component, OnInit } from '@angular/core';
import { IUser } from './user';
import { UserapiService } from '../userapi.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: IUser[];

  userGroup = new FormGroup({
    userName: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private UserApi:UserapiService) { 
    this.users = new Array<IUser>();
    // this.getAllUser();
  }

  ngOnInit(): void 
  {
    this.getAllUser();
  }

  getAllUser()
  {
    this.UserApi.getAllUser().subscribe(
      (response) => {
        this.users = response;
      }
    )
  }

  addUser(userGroup: FormGroup)
  {
    let tempUser: IUser = 
    {
      userName: userGroup.get("userName")?.value,
      email: userGroup.get("email")?.value,
      password: userGroup.get("password")?.value,
      registerDate: new Date()
    }

    this.UserApi.addUser(tempUser).subscribe(
      (response) => {
        //console.log(response["name"]);

        this.getAllUser();
      }
    )
  }
}
