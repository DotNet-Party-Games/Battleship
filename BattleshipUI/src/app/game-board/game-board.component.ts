import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { IGameAPI, IGameboard, INavy } from '../services/gameboard';
import { BattleshipAPIService } from '../services/battleship-api.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  width: number[];
  height: number[];
  roomNumber: number;
  playerId: string;
  ocean: string[][][] = new Array(10);
  enemyOcean: string[][][] = new Array(10);
  selected: number[] = new Array(2);
  GameBoard: IGameAPI[];
  turn: boolean;
  isWinner: boolean;
  winnerId: string;

  constructor(private GameApi: BattleshipAPIService, public auth: AuthService) {
    this.width = new Array(10);
    this.height = new Array(10);
    this.roomNumber = 0;
    // this.playerId = 2
    this.playerId = "1";
    // this.auth.idTokenClaims$.subscribe(
    //   (response) => {
    //     console.log(response);
    //     if (response?.iat) {
    //       this.playerId = response.iat
    //     }
    //   });
    this.winnerId = "";
    this.isWinner = false;
    this.turn = false;

    for (let i = 0; i < 10; i++) {
      this.ocean[i] = new Array(10);
      this.enemyOcean[i] = new Array(10);
      for (let j = 0; j < 10; j++) {
        this.ocean[i][j] = new Array(2);
        this.enemyOcean[i][j] = new Array(2);
        this.ocean[i][j][0] = "water";
        this.enemyOcean[i][j][0] = "water";
      }
    }
    this.selected[0] = 0;
    this.selected[1] = 0;
    this.GameBoard = new Array(1);
    setInterval(() => { this.GetGameBoard(this.roomNumber) }, 1 * 1000);
  }

  ngOnInit(): void {
    this.GetGameBoard(this.roomNumber);
  }

  GetGameBoard(roomId: number) {
    if (this.winnerId != "") {
      this.isWinner = true;
    }

    this.GameApi.GetGameBoard(roomId).subscribe(
      (response) => {
        this.GameBoard[0] = response;
        this.winnerId = this.GameBoard[0].winnerId;

        if (this.GameBoard[0].currentTurn) {
          console.log([this.GameBoard[0].user1.userId == this.playerId, this.GameBoard[0].user1.userId, this.playerId]);
          this.turn = this.GameBoard[0].user1.userId == this.playerId;
        }
        else {
          this.turn = this.GameBoard[0].user2.userId == this.playerId;
        }

        if (this.GameBoard[0].user1.userId == this.playerId) {
          this.InterpretOcean(this.GameBoard[0].user1Navy.ocean, this.ocean);
          this.InterpretOcean(this.GameBoard[0].user1Navy.enemyOcean, this.enemyOcean);
        }
        else {
          this.InterpretOcean(this.GameBoard[0].user2Navy.ocean, this.ocean);
          this.InterpretOcean(this.GameBoard[0].user2Navy.enemyOcean, this.enemyOcean);
        }
      }
    );
  }

  Attack(x: number, y: number, z: number) {
    if (this.turn) {
      this.GameApi.Attack(this.roomNumber, this.playerId, x, y, z).subscribe(
        (response) => {
          this.GameBoard[0] = response;
          if (this.GameBoard[0].user1.userId == this.playerId) {
            this.InterpretOcean(this.GameBoard[0].user1Navy.ocean, this.ocean);
            this.InterpretOcean(this.GameBoard[0].user1Navy.enemyOcean, this.enemyOcean);
          }
          else {
            this.InterpretOcean(this.GameBoard[0].user2Navy.ocean, this.ocean);
            this.InterpretOcean(this.GameBoard[0].user2Navy.enemyOcean, this.enemyOcean);
          }
        }
      );
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
            baseOcean[i][j][0] = "destroyer2";
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
