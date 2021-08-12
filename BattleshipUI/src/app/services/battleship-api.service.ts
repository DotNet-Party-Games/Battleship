import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { IGameAPI } from './gameboard';

@Injectable({
  providedIn: 'root'
})
export class BattleshipAPIService {
  private url: string = "https://localhost:44317/api/";

  constructor(private http: HttpClient) { }

  GetGameBoard(roomId: number): Observable<IGameAPI> {
    let param = new HttpParams().set("roomNumber", roomId);
    return this.http.get<IGameAPI>(this.url + "GameBoard/get/", { params: param })
  }

  Attack(roomId: number, userId: number, x: number, y: number, z: number): Observable<IGameAPI> {
    let attackBody = new HttpParams({
      fromObject: {
        'roomNumber': roomId,
        'userId': userId,
        'x': x,
        'y': y,
        'z': z
      }
    });
    let param = new HttpParams().set("roomNumber", roomId).set('userId', userId).set('x', x).set('y', y).set('z', z);
    return this.http.put<IGameAPI>(this.url + "GameBoard/Attack/", attackBody, { params: param });
  }

}
