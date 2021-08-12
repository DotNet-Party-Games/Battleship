import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  message: string;
  broadcast:string;

  // initialize socket object
  constructor(private socket: Socket) { }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  receiveMessage(): string {
    this.socket.on('message-broadcast', (msg: string) => {
      this.broadcast = String(msg);
      console.log(`Broadcast equals to ${this.broadcast}`);
    });
    return this.broadcast;
  }
}
