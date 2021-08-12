import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { ChatService } from '../services/chat.service';

//const SOCKET_ENDPOINT = 'ws://localhost:3000';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  // declare variables
  socket: Socket;
  message: string;
  data:string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.displayOtherChat();
  }

  displayOtherChat() {
    this.data = this.chatService.receiveMessage();
    console.log(`${this.data} was received in the client`);
      if (this.data) {
        const element = document.createElement('li');
        element.innerHTML = this.data;
        element.style.background = 'coral';
        element.style.padding =  '15px 30px';
        element.style.margin = '10px';
        document.getElementById('message-list').appendChild(element);
      }   
  }

  SendMessage() {
    this.chatService.sendMessage(this.message);
    this.displayOtherChat();
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding =  '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    let message = document.getElementById('message-list');
    message.appendChild(element);
    this.message = '';
  }
}
