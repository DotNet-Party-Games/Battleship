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
    this.PlayerBoardUpdate=this.socket.startingNavy;
    // this.socket.SendPlayerBoard(this.PlayerBoardUpdate);
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

        this.enemyOcean.ocean[i][j][0] = 0;
        this.enemyOcean.oceanLegend[i][j][0] = "water";
      }
    }
  }

  
}
