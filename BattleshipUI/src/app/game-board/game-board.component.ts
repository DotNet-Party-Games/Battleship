import { Component, Input, OnInit} from '@angular/core';
import { INavy, IShot } from '../services/gameboard';
import { GameStateService } from '../services/gamestate.service';
import { Subscription } from 'rxjs';
import { IUser } from '../user/user';
import { InteractivityChecker } from '@angular/cdk/a11y';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  @Input()
  playerName: IUser;
  @Input()
  playerOcean: INavy = new INavy;

  width: number[];
  height: number[];
  enemyName: IUser;
  enemyOcean: INavy = new INavy;
  PlayerBoardUpdate: INavy = new INavy;
  statusMessage: string;
  turn: boolean;
  _room: Subscription;

  constructor(private socket:GameStateService) {
    this.width = new Array(10);
    this.height = new Array(10);
    this.turn = false;
  }

  ngOnInit(): void {
    this.Seed();
    this._room = this.socket.currentTurn.subscribe(turn=>this.turn = turn);
    this.socket.startingNavy = this.PlayerBoardUpdate;
    this.socket.SendPlayerBoard(this.PlayerBoardUpdate);
    this._room = this.socket.playerBoardUpdate.subscribe(shot=>this.PlayerBoardUpdate = shot);
    this._room = this.socket.enemyName.subscribe(enemy=>this.enemyName.userName = enemy);
    this._room = this.socket.enemyFleet.subscribe(board=>this.enemyOcean = board);
    this._room = this.socket.statusMessage.subscribe(mess=>this.statusMessage=mess);
    
    console.log(this.PlayerBoardUpdate.ocean);
    console.log(this.enemyOcean.ocean);
    // this.socket.UpdateNames(this.playerName.userName);
  }

  Attack(x: number, y: number, z: number) {
    if (this.turn){
      let message:string;
      console.log(x+y+z);
      console.log(this.enemyOcean.ocean[x][y][z]);
      if(this.enemyOcean.ocean[x][y][z]>5){
        // message = this.playerName.userName + " Hit " + this.enemyName.userName;
        this.enemyOcean.ocean[x][y][z] = 1;
        this.enemyOcean.oceanLegend[x][y][z] = "hit";
        console.log("Hit");
        this.socket.SendShot(this.enemyOcean, message);
      } else if(this.enemyOcean.ocean[x][y][z] == 0){
        // message = this.playerName.userName + " Missed " + this.enemyName.userName;
        this.enemyOcean.ocean[x][y][z] = 2;
        this.enemyOcean.oceanLegend[x][y][z] = "miss";
        this.socket.SendShot(this.enemyOcean, message);
      }
      
    }
  }

  Seed(){
    this.PlayerBoardUpdate.ocean = new Array(10);
    this.PlayerBoardUpdate.oceanLegend = new Array(10);

    this.enemyOcean.ocean = new Array(10);
    this.enemyOcean.oceanLegend = new Array(10);
    for (let i = 0; i < 10; i ++) {
      this.PlayerBoardUpdate.ocean[i] = new Array(10);
      this.PlayerBoardUpdate.oceanLegend[i] = new Array(10);

      this.enemyOcean.ocean[i] = new Array(10);
      this.enemyOcean.oceanLegend[i] = new Array(10);

      for(let j = 0; j < 10; j ++) {

        this.PlayerBoardUpdate.ocean[i][j] = new Array(2);
        this.PlayerBoardUpdate.oceanLegend[i][j] = new Array(2);

        this.enemyOcean.ocean[i][j] = new Array(2);
        this.enemyOcean.oceanLegend[i][j] = new Array(2);

        this.PlayerBoardUpdate.ocean[i][j][0] = 0;
        this.PlayerBoardUpdate.oceanLegend[i][j][0] = "water";

        this.enemyOcean.ocean[i][j][0] = 8;
        this.enemyOcean.oceanLegend[i][j][0] = "patrolboat1";
      }
    }
  }

  InterpretOcean(item: number[][][], baseOcean: string[][][]) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        switch (item[i][j][0]) {
          case 0:
            baseOcean[i][j][0] = "water";
            break;
          case 1:
            baseOcean[i][j][0] = "hit";
            break;
          case 2:
            baseOcean[i][j][0] = "miss";
            break;
          case 3:
            baseOcean[i][j][0] = "destroyed";
            break;
          case 4:
            baseOcean[i][j][0] = "destroyed";
            break;
          case 5:
            baseOcean[i][j][0] = "water";
            break;
          case 6:
            baseOcean[i][j][0] = "patrolboat1H";
            break;
          case 7:
            baseOcean[i][j][0] = "patrolboat2H";
            break;
          case 8:
            baseOcean[i][j][0] = "patrolboat1";
            break;
          case 9:
            baseOcean[i][j][0] = "patrolboat2";
            break;
          case 10:
            baseOcean[i][j][0] = "submarine1H";
            break;
          case 11:
            baseOcean[i][j][0] = "submarine2H";
            break;
          case 12:
            baseOcean[i][j][0] = "submarine3H";
            break;
          case 13:
            baseOcean[i][j][0] = "submarine1";
            break;
          case 14:
            baseOcean[i][j][0] = "submarine2";
            break;
          case 15:
            baseOcean[i][j][0] = "submarine3";
            break;
          case 16:
            baseOcean[i][j][0] = "destroyer1H";
            break;
          case 17:
            baseOcean[i][j][0] = "destroyer2H";
            break;
          case 18:
            baseOcean[i][j][0] = "destroyer3H";
            break;
          case 19:
            baseOcean[i][j][0] = "destroyer1";
            break;
          case 20:
            baseOcean[i][j][0] = "destroyer2";
            break;
          case 21:
            baseOcean[i][j][0] = "destroyer3";
            break;
          case 22:
            baseOcean[i][j][0] = "battleship1H";
            break;
          case 23:
            baseOcean[i][j][0] = "battleship2H";
            break;
          case 24:
            baseOcean[i][j][0] = "battleship3H";
            break;
          case 25:
            baseOcean[i][j][0] = "battleship4H";
            break;
          case 26:
            baseOcean[i][j][0] = "battleship1";
            break;
          case 27:
            baseOcean[i][j][0] = "battleship2";
            break;
          case 28:
            baseOcean[i][j][0] = "battleship3";
            break;
          case 29:
            baseOcean[i][j][0] = "battleship4";
            break;
          case 30:
            baseOcean[i][j][0] = "aircraftcarrier1H";
            break;
          case 31:
            baseOcean[i][j][0] = "aircraftcarrier2H";
            break;
          case 32:
            baseOcean[i][j][0] = "aircraftcarrier3H";
            break;
          case 33:
            baseOcean[i][j][0] = "aircraftcarrier4H";
            break;
          case 34:
            baseOcean[i][j][0] = "aircraftcarrier5H";
            break;
          case 35:
            baseOcean[i][j][0] = "aircraftcarrier1";
            break;
          case 36:
            baseOcean[i][j][0] = "aircraftcarrier2";
            break;
          case 37:
            baseOcean[i][j][0] = "aircraftcarrier3";
            break;
          case 38:
            baseOcean[i][j][0] = "aircraftcarrier4";
            break;
          case 39:
            baseOcean[i][j][0] = "aircraftcarrier5";
            break;
          default:
            baseOcean[i][j][0] = "water";
            break;
        }
      }
    }
  }
}
