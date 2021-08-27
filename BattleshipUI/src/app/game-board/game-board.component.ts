import { Component, Input, OnInit} from '@angular/core';
import { IAirforce, INavy, IShot } from '../services/gameboard';
import { GameStateService } from '../services/gamestate.service';
import { Subscription } from 'rxjs';
import { InteractivityChecker } from '@angular/cdk/a11y';
import { Router } from '@angular/router';

export interface IUser
{
  userId: string,
  userName: string
}

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  width: number[];
  height: number[];
  enemyOceanBoard: INavy = new INavy;
  enemyAirBoard:IAirforce = new IAirforce;
  PlayerOceanUpdate: INavy = new INavy;
  PlayerAirUpdate: IAirforce = new IAirforce;
  userList:string[] = [];
  statusMessage: string;
  turn: boolean;
  _room: Subscription;
  patrol:number;
  sub:number;
  dest:number;
  battle:number;
  carrier:number;
  winner:boolean;
  loser:boolean;
  isWater:boolean = this.socket.environ;
  view:boolean;
  playernumber:number;

  constructor(private socket:GameStateService, private router:Router) {
    this.width = new Array(10);
    this.height = new Array(10);
    this.turn = false;
  }
  ngOnInit(): void {
    this.Seed();
    this._room = this.socket.currentTurn.subscribe(turn=>this.turn = turn);
    this.PlayerOceanUpdate = this.socket.startingNavy;
    this.PlayerAirUpdate = this.socket.startingAir;
    // this.socket.SendPlayerBoard(this.PlayerBoardUpdate);
    this._room = this.socket.playerAirBoardUpdate.subscribe(shot=>this.PlayerAirUpdate = shot);
    this._room = this.socket.playerOceanBoardUpdate.subscribe(shot=>this.PlayerOceanUpdate = shot);
    this._room = this.socket.enemyFleet.subscribe(board=>this.enemyOceanBoard = board);
    this._room = this.socket.enemyAirFleet.subscribe(board=>this.enemyAirBoard = board);
    this._room = this.socket.statusMessage.subscribe(mess=>this.statusMessage = mess);
    this._room = this.socket.isWater.subscribe(place => this.isWater = place);
    this.view = this.isWater;
    this.patrol = 2;
    this.sub = 3;
    this.dest = 3;
    this.battle = 4;
    this.carrier = 5;
    // this.socket.UpdateNames(this.playerName.userName);
  }
  Attack(x: number, y: number, z: number) {
    if (this.turn){
      let message:string;
      console.log(x+y+z);
      console.log(this.enemyOceanBoard.ocean[x][y][z]);
      if(this.enemyOceanBoard.ocean[x][y][z]>5){
        // message = this.playerName.userName + " Hit " + this.enemyName.userName;
        this.enemyOceanBoard.ocean[x][y][z] = 1;
        this.enemyOceanBoard.oceanLegend[x][y][z] = "hit";
        console.log("Hit");
        this.UpdateBoardStatus(this.enemyOceanBoard.craft[x][y][z]);
        if(this.patrol==0&&this.sub==0&&this.dest==0&&this.battle==0&&this.carrier==0){
          this.socket.WinningShot();
        }else{
          this.socket.SendShot(this.enemyOceanBoard, message);
          this.playaudio(this.enemyOceanBoard.oceanLegend[x][y][z]);
        } 
      }
      else if(this.enemyOceanBoard.ocean[x][y][z] == 0){
          // message = this.playerName.userName + " Missed " + this.enemyName.userName;
          this.enemyOceanBoard.ocean[x][y][z] = 2;
          this.enemyOceanBoard.oceanLegend[x][y][z] = "miss";
          this.socket.SendShot(this.enemyOceanBoard, message);
          this.playaudio(this.enemyOceanBoard.oceanLegend[x][y][z]);
      }

  }
  }
  playaudio(action:string){
    let audio = new Audio();
    switch(action){
      case "miss":
        audio.src = "../../assets/splash.wav";
        audio.load();
        audio.play();
        break;
      case "hit":
        audio.src = "../../assets/explosion.mp3";
        audio.load();
        audio.play();
        break;
      case "sink":
        audio.src = "../../assets/bubbling_water.mp3"
    }

  }
  Seed(){
    this.PlayerOceanUpdate.ocean = new Array(10);
    this.PlayerOceanUpdate.oceanLegend = new Array(10);
    this.PlayerOceanUpdate.craft = new Array(10);

    this.enemyOceanBoard.ocean = new Array(10);
    this.enemyOceanBoard.oceanLegend = new Array(10);
    this.enemyOceanBoard.craft = new Array(10);

    for (let i = 0; i < 10; i ++) {
      this.PlayerOceanUpdate.ocean[i] = new Array(10);
      this.PlayerOceanUpdate.oceanLegend[i] = new Array(10);
      this.PlayerOceanUpdate.craft[i] = new Array(10);

      this.enemyOceanBoard.ocean[i] = new Array(10);
      this.enemyOceanBoard.oceanLegend[i] = new Array(10);
      this.enemyOceanBoard.craft[i] = new Array(10);

      for(let j = 0; j < 10; j ++) {

        this.PlayerOceanUpdate.ocean[i][j] = new Array(2);
        this.PlayerOceanUpdate.oceanLegend[i][j] = new Array(2);
        this.PlayerOceanUpdate.craft[i][j] = new Array(2);

        this.enemyOceanBoard.ocean[i][j] = new Array(2);
        this.enemyOceanBoard.oceanLegend[i][j] = new Array(2);
        this.enemyOceanBoard.craft[i][j] = new Array(2);

        this.PlayerOceanUpdate.ocean[i][j][0] = 0;
        this.PlayerOceanUpdate.oceanLegend[i][j][0] = "water";
        this.PlayerOceanUpdate.craft[i][j][0] = "None";

        this.enemyOceanBoard.ocean[i][j][0] = 0;
        this.enemyOceanBoard.oceanLegend[i][j][0] = "water";
        this.enemyOceanBoard.craft[i][j][0];
      }
    }
  }
  UpdateBoardStatus(craft:string){
    switch (craft) {
      case "Patrol":
        this.patrol-=1;
        if(this.patrol==0){
          this.Extenguish(craft);
        }
      break;
      case "Submarine":
        this.sub-=1;
        if(this.sub==0){
          this.Extenguish(craft);
        }
      break;
      case "Destroyer":
        this.dest-=1;
        if(this.dest==0){
          this.Extenguish(craft);
        }
      break;
      case "Battleship":
        this.battle-=1;
        if(this.battle==0){
          this.Extenguish(craft);
        }
      break;
      case "Carrier":
        this.carrier-=1;
        if(this.carrier==0){
          this.Extenguish(craft);
        }
      break;
      default:
      break;
    }
  }
  Extenguish(craft:string){
    for (let i = 0; i < 10; i ++) {
      for(let j = 0; j < 10; j ++) {
        if(this.enemyOceanBoard.craft[i][j][0] == craft){
          this.enemyOceanBoard.ocean[i][j][0] = 3;
          this.enemyOceanBoard.oceanLegend[i][j][0] = "destroyed";
        }
      }
    }
  }
  LeaveRoom(){
    this.router.navigate(["/roomlist"]);
  }
}
