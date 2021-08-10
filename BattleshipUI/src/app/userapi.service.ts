import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IUser } from './user/user';

@Injectable({
  providedIn: 'root'
})
export class UserapiService {

  private url = "https://localhost:5001/api/"
  //private url = "https://battleship-tsw.azurewebsites.net/api/"

  constructor(private http: HttpClient) { }

  getAllUser() : Observable<IUser[]>
  {
    return this.http.get<IUser[]>(this.url + "User");
  }

  addUser(newUser: IUser) : Observable<IUser>
  {
    return this.http.post<IUser>(this.url + "User/add", newUser);
  }
}
