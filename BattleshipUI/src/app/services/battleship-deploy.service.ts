import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Ship } from './ship';

@Injectable({
  providedIn: 'root'
})
export class BattleshipDeployService {

  constructor(private socket:Socket) { }

  sendboard(positions: Ship[], roomNum:number, userId:number){
    this.socket.emit("send coordinates", positions, roomNum, userId);
  }
  leaveRoom(){
    this.socket.emit("Leave Room");
  }
}
