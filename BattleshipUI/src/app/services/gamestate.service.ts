import { Injectable, Input } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer } from 'rxjs';
import { IAirforce, INavy, IUser } from './gameboard';

@Injectable({
    providedIn: 'root'
  })
  export class GameStateService {

    //Updated on each shot
    currentTurn = this.socket.fromEvent<boolean>('turn change');

    //Updated on each enemy shot
    playerOceanBoardUpdate = this.socket.fromEvent<INavy>('enemy shoots ocean');

    //Updated on each enemy shot
    playerAirBoardUpdate = this.socket.fromEvent<IAirforce>('enemy shoots air');

    //Updated on each team shot
    enemyOceanBoard = this.socket.fromEvent<INavy>('team shoots ocean');

    //Updated on each team shot
    enemyAirBoard = this.socket.fromEvent<IAirforce>('team shoots air');

    enemyFleet = this.socket.fromEvent<INavy>('enemy ocean fleet');
    enemyAirFleet = this.socket.fromEvent<IAirforce>('enemy air fleet');
    teammateAirFleet = this.socket.fromEvent<IAirforce>('teammate air fleet');
    teammateFleet = this.socket.fromEvent<INavy>('teammate ocean fleet');

    //Updated on each shot
    statusMessage = this.socket.fromEvent<string>('status message');

    startingNavy:INavy = new INavy;
    startingAir:IAirforce = new IAirforce;

    //Updated once everyone is ready
    gameStarted = this.socket.fromEvent<boolean>('game active status');

    //Updated on each person readying up
    playerOneReady = this.socket.fromEvent<boolean>('player one ready');
    playerTwoReady = this.socket.fromEvent<boolean>('player two ready');
    playerThreeReady = this.socket.fromEvent<boolean>('player three ready');
    playerFourReady = this.socket.fromEvent<boolean>('player four ready');

    opponentReady = this.socket.fromEvent<boolean>('opponent ready');

    //Gets updated on the winning shot (Inside 'win shot')
    winner = this.socket.fromEvent<boolean>('winner');

    //Gets updated on the winning shot (Inside 'win shot')
    loser = this.socket.fromEvent<boolean>('loser');

    //Gets updated upon joining a room (inside AddUserToList())
    userList = this.socket.fromEvent<string[]>('user list');

    //Gets updated upon joining a room (inside AddUserToList())
    isWater = this.socket.fromEvent<boolean>('is water');

    //Gets updated upon joining a room (inside AddUserToList())
    playerteam = this.socket.fromEvent<boolean>('player team');

    //Gets updated upon joining a room (inside AddUserToList())
    maxSize = this.socket.fromEvent<number>('max size');

    playerNumber = this.socket.fromEvent<number>('player number');

    win:boolean;

    size:number;

    environ:boolean;
  
    // initialize socket object
    constructor(private socket: Socket) {
      this.winner.subscribe(result => this.win = result);
      this.maxSize.subscribe(result => this.size=result);
      this.isWater.subscribe(result=>this.environ=result);
     }
    
    SendPlayerBoard(board:INavy|IAirforce){
        this.socket.emit('send player board to opponent', board);
        this.socket.once('enemy fleet', ()=>this.socket.emit('send player board to opponent', board));
    }

    SendShot(updatedBoard:INavy|IAirforce, status:string){
        this.socket.emit('send shot', updatedBoard);
        this.socket.emit('status message', status);
    }

    ReadyUp(){
      this.socket.emit('player ready');
    }

    StartGame(){
      this.socket.emit('start game');
    }

    LeaveRoom(){
      if(this.win){
        this.socket.emit('back to lobby after game')
      } else{
        this.socket.emit("leave Room");
      }
    }

    WinningShot(){
      this.socket.emit('win shot');
    }



    InterpretOcean(item: number[][][], baseOcean: string[][][], craft: string[][][]) {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          switch (baseOcean[i][j][0]) {
            case "water":
              item[i][j][0] = 0;
              craft[i][j][0] = "None";
              break;
            case "hit":
              item[i][j][0] = 1;
              craft[i][j][0] = "None";
              break;
            case "miss":
              item[i][j][0] = 2;
              craft[i][j][0] = "None";
              break;
            case "destroyed":
              item[i][j][0] = 3;
              craft[i][j][0] = "None";
              break;
            case "destroyed":
              item[i][j][0] = 4;
              craft[i][j][0] = "None";
              break;
            case "water":
              item[i][j][0] = 5;
              craft[i][j][0] = "None";
              break;
            case "patrolboatr1":
              item[i][j][0] = 6;
              craft[i][j][0] = "Patrol";
              break;
            case "patrolboatr2":
              item[i][j][0] = 7;
              craft[i][j][0] = "Patrol";
              break;
            case "patrolboat1":
              item[i][j][0] = 8;
              craft[i][j][0] = "Patrol";
              break;
            case "patrolboat2":
              item[i][j][0] = 9;
              craft[i][j][0] = "Patrol";
              break;
            case "submariner1":
              item[i][j][0] = 10;
              craft[i][j][0] = "Submarine";
              break;
            case "submariner2":
              item[i][j][0] = 11;
              craft[i][j][0] = "Submarine";
              break;
            case "submariner3":
              item[i][j][0] = 12;
              craft[i][j][0] = "Submarine";
              break;
            case "submarine1":
              item[i][j][0] = 13;
              craft[i][j][0] = "Submarine";
              break;
            case "submarine2":
              item[i][j][0] = 14;
              craft[i][j][0] = "Submarine";
              break;
            case "submarine3":
              item[i][j][0] = 15;
              craft[i][j][0] = "Submarine";
              break;
            case "destroyerr1":
              item[i][j][0] = 16;
              craft[i][j][0] = "Destroyer";
              break;
            case "destroyerr2":
              item[i][j][0] = 17;
              craft[i][j][0] = "Destroyer";
              break;
            case "destroyerr3":
              item[i][j][0] = 18;
              craft[i][j][0] = "Destroyer";
              break;
            case "destroyer1":
              item[i][j][0] = 19;
              craft[i][j][0] = "Destroyer";
              break;
            case "destroyer2":
              item[i][j][0] = 20;
              craft[i][j][0] = "Destroyer";
              break;
            case "destroyer3":
              item[i][j][0] = 21;
              craft[i][j][0] = "Destroyer";
              break;
            case "battleshipr1":
              item[i][j][0] = 22;
              craft[i][j][0] = "Battleship";
              break;
            case "battleshipr2":
              item[i][j][0] = 23;
              craft[i][j][0] = "Battleship";
              break;
            case "battleshipr3":
              item[i][j][0] = 24;
              craft[i][j][0] = "Battleship";
              break;
            case "battleshipr4":
              item[i][j][0] = 25;
              craft[i][j][0] = "Battleship";
              break;
            case "battleship1":
              item[i][j][0] = 26;
              craft[i][j][0] = "Battleship";
              break;
            case "battleship2":
              item[i][j][0] = 27;
              craft[i][j][0] = "Battleship";
              break;
            case "battleship3":
              item[i][j][0] = 28;
              craft[i][j][0] = "Battleship";
              break;
            case "battleship4":
              item[i][j][0] = 29;
              craft[i][j][0] = "Battleship";
              break;
            case "aircraftcarrierr1":
              craft[i][j][0] = "Carrier";
              item[i][j][0] = 30;
              break;
            case "aircraftcarrierr2":
              craft[i][j][0] = "Carrier";
              item[i][j][0] = 31;
              break;
            case "aircraftcarrierr3":
              craft[i][j][0] = "Carrier";
              item[i][j][0] = 32;
              break;
            case "aircraftcarrierr4":
              craft[i][j][0] = "Carrier";
              item[i][j][0] = 33;
              break;
            case "aircraftcarrierr5":
              craft[i][j][0] = "Carrier";
              item[i][j][0] = 34;
              break;
            case "aircraftcarrier1":
              craft[i][j][0] = "Carrier";
              item[i][j][0] = 35;
              break;
            case "aircraftcarrier2":
              craft[i][j][0] = "Carrier";
              item[i][j][0] = 36;
              break;
            case "aircraftcarrier3":
              craft[i][j][0] = "Carrier";
              item[i][j][0] = 37;
              break;
            case "aircraftcarrier4":
              craft[i][j][0] = "Carrier";
              item[i][j][0] = 38;
              break;
            case "aircraftcarrier5":
              craft[i][j][0] = "Carrier";
              item[i][j][0] = 39;
              break;
            default:
              item[i][j][0] = 0;
              craft[i][j][0] = "None";
              break;
          }
        }
      }
    }


  }
  