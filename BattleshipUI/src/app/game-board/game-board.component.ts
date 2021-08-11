import { Component, OnInit } from '@angular/core';
import { IGameAPI, IGameboard, INavy } from '../services/gameboard';
import { BattleshipAPIService } from '../services/battleship-api.service'

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  width: number[];
  height: number[];
  ocean: string[][][] = new Array(10);
  enemyOcean: string[][][] = new Array(10);
  selected: number[] = new Array(2);
  GameBoard: IGameAPI[];

  constructor(private GameApi: BattleshipAPIService) {
    this.width = new Array(10);
    this.height = new Array(10);

    for (let i = 0; i < 10; i++) {
      this.ocean[i] = new Array(10);
      for (let j = 0; j < 10; j++) {
        this.ocean[i][j] = new Array(2);
        this.ocean[i][j][0] = "water";
      }
    }
    this.selected[0] = 0;
    this.selected[1] = 0;
    this.GameBoard = new Array(1);
  }

  ngOnInit(): void {
    this.GetGameBoard(1);
  }

  GetGameBoard(roomId: number) {
    this.GameApi.GetGameBoard(roomId).subscribe(
      (response) => {
        this.GameBoard[0] = response;
        this.InterpretOcean(this.GameBoard[0].user1Navy.ocean);
        this.enemyOcean = this.GameBoard[0].user1Navy.enemyOcean;
        console.log(this.GameBoard[0]);
        console.log(response["user1Navy"])
      }
    );
    console.log(this.GameBoard[0]);
  }


  InterpretOcean(item: number[][][]) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        switch (item[i][j][0]) {
          case 5:
            this.ocean[i][j][0] = "water";
            break;
          default:
            this.ocean[i][j][0] = "water";
            break;
        }
      }
    }
  }
}
