import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameStateService } from '../services/gamestate.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  gameState:boolean = false;
  _roomSub:Subscription;

  constructor(private socket:GameStateService) { }

  ngOnInit(): void {
    this._roomSub = this.socket.gameStarted.subscribe(started=>this.gameState=started);
  }

}
