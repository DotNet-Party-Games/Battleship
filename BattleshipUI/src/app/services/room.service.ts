import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  // variable declarations
  // events emitted by server, consumed on client as observable
  currentRoom = this.socket.fromEvent<Room>('room');
  rooms = this.socket.fromEvent<string[]>('rooms');

  // constructor initializes socket use
  constructor(private socket: Socket) { }

  // based off events in server
  joinRoom(id: string) {
    this.socket.emit('join room', id);
  }

  addRoom() {
    this.socket.emit('add a room', { id: this.roomId() });
  }

  // function to make a random room id that can be parsed into a number for api calls
  private roomId() {
    let roomId = '';
    const possible = '123456789';
    for(let i = 0; i < 3; i++) {
      roomId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return roomId;
  }
}
