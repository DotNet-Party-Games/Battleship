import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGameAPI } from './gameboard';

@Injectable({
  providedIn: 'root'
})
export class BattleshipAPIService {
  private url: string = "https://localhost:44317/api/";

  constructor(private http: HttpClient) { }

  GetGameBoard(roomId: number): Observable<IGameAPI> {
    return this.http.get<IGameAPI>(this.url + "GameBoard/get/", { [roomId]: HttpParams })
  }

}
