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

  SetUp(roomNumber:number, user1Id:number, user2Id:number): Observable<IGameAPI>{
    let setupBody = new HttpParams({
      fromObject: {
        'roomNumber': roomNumber,
        'user1Id': user1Id,
        'user2Id': user2Id
      }
    });
    let param = new HttpParams().set('roomNumber', roomNumber).set('user1Id', user1Id).set('user2Id', user2Id);
    return this.http.put<IGameAPI>(this.url + "GameBoard/SetUp", setupBody, {params: param});
  }

  PlaceShip(roomNumber:number, userId:number, shipId:number, x:number, y:number, z:number, horizontal:boolean){
    let placeshipbody = new HttpParams({
      fromObject: {
        'roomNumber': roomNumber,
        'userId': userId,
        'shipId': shipId,
        'x': x,
        'y': y,
        'z': z,
        'horizontal': horizontal
      }
    });
    let param = new HttpParams().set('roomNumber', roomNumber).set('userId', userId).set('shipId', shipId).set('x', x).set('y', y).set('z', z).set('horizontal', horizontal);
    return this.http.put<IGameAPI>(this.url + "GameBoard/PlaceShip", placeshipbody, {params: param});
  }

  DeployShips(roomNumber:number, userId:number): Observable<IGameAPI>{
    let deployshipsbody = new HttpParams({
      fromObject: {
        'roomNumber': roomNumber,
        'userId': userId
      }
    });
    let param = new HttpParams().set('roomNumber', roomNumber).set('userId', userId);
    return this.http.put<IGameAPI>(this.url + "GameBoard/DeployShips", deployshipsbody, {params: param});
  }

  /*TestSetup(roomId: number): Observable<IGameAPI> {
    let setupBody = new HttpParams({
      fromObject: {
        'roomNumber' : roomId,
        'user1Id': 1,
        'user2Id' : 2
      }
    });
    this.http.put(this.url + "GameBoard/SetUp/", setupBody);
    for (let i = 0; i < 5; i++) {
      let ship1body = new HttpParams({
        fromObject: {
          'roomNumber': roomId,
          'userId': 1,
          'shipId': i,
          'x': 0,
          'y': i,
          'z': 0,
          'horizontal': true
        }
      });
      this.http.put(this.url + "GameBoard/PlaceShip/", ship1body);
      ship1body.set('userId', 2);
      this.http.put(this.url + "GameBoard/PlaceShip/", ship1body);
    }
    return this.GetGameBoard(roomId);
  }

  TestDeploy(roomId: number): Observable<IGameAPI> {
    let deployBody = new HttpParams({
      fromObject: {
        'roomNumber': roomId,
        'userId': 1
      }
    })
    this.http.put(this.url + "GameBoard/DeployShips/", deployBody);
    deployBody.set('userId', 2);
    return this.http.put<IGameAPI>(this.url + "GameBoard/DeployShips/", deployBody);
  }*/

}
