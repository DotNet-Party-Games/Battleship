import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Ship } from './ship';

@Injectable({
  providedIn: 'root'
})
export class BattleshipDeployService {
  roomnum = this.socket.fromEvent<number>("send room number")

  constructor(private socket:Socket) { }

  sendboard(positions: Ship[], roomNum:number, userId:number){
    this.socket.emit("send coordinates", positions, roomNum, userId);
  }
  leaveRoom(){
    this.socket.emit("Leave Room");
  }
  getroomnumber(userid:number){
    this.socket.emit("get room number", userid);
  }
}