import { Injectable, Input } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer } from 'rxjs';
import { INavy } from './gameboard';

@Injectable({
    providedIn: 'root'
  })
  export class GameStateService {
    currentTurn = this.socket.fromEvent<boolean>('turn change');
    playerBoardUpdate = this.socket.fromEvent<INavy>('enemy shoots');
    playerName = this.socket.fromEvent<string>('player name');
    enemyName = this.socket.fromEvent<string>('enemy name');
    enemyFleet = this.socket.fromEvent<INavy>('enemy fleet');
    statusMessage = this.socket.fromEvent<string>('status message');
    startingNavy:INavy;
  
    // initialize socket object
    constructor(private socket: Socket) { }
    
    SendPlayerBoard(navy:INavy){
        this.socket.emit('send player board to opponent', navy);
        this.socket.once('enemy fleet', ()=>this.socket.emit('send player board to opponent', this.startingNavy));
    }

    SendShot(updatedBoard:INavy, status:string){
        this.socket.emit('send shot',updatedBoard);
        this.socket.emit('status message', status);
    }

    UpdateNames(player:string){
      this.socket.emit('update name', player);
    }

  }
  