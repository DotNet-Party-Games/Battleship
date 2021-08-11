import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Ship } from '../services/ship';

@Component({
  selector: 'app-gameboard-setup',
  templateUrl: './gameboard-setup.component.html',
  styleUrls: ['./gameboard-setup.component.css']
})
export class GameboardSetupComponent implements OnInit {

  width: number[];
  height: number[];
  selected: number[] = new Array(2);
  test: string[][] = new Array(10);
  selectedShip: string;
  isVertical: boolean = true;
  ships: Ship[] = new Array(5);

  constructor() { 
    this.height = new Array(10);
    this.width = new Array(10);

    for(let i = 0; i < 10; i++){
      this.test[i] = new Array(10);
      for(let j=0; j<10; j++){
        this.test[i][j] = "water";
      }
    }
    this.selected[0] = 0;
    this.selected[1] = 0;
    this.selectedShip = "";

    for(let i =0; i < 5; i++){
      this.ships[i] = new Ship;
    }

  }

  ngOnInit(): void {
  }

  select(i:number, j:number){
    this.selected[0] = i;
    this.selected[1] = j;
    this.placeShip();
  }

  selectShip(s:string){
    this.selectedShip = s;
  }

  placeShip(){
    if(this.isVertical==true){
      switch (this.selectedShip) {
        case "patrolboat":
          if(this.selected[0]+1 < 10 && this.checkForSpace(2)){
            if(this.ships[4].placed == true){
              this.test[this.ships[4].y][this.ships[4].x] = "water";
              this.test[this.ships[4].y+1][this.ships[4].x] = "water";
            }
            this.test[this.selected[0]][this.selected[1]] = "patrolboat1";
            this.test[this.selected[0]+1][this.selected[1]] = "patrolboat2";
            this.ships[4].y = this.selected[0];
            this.ships[4].x = this.selected[1];
            this.ships[4].placed = true;
          }
          break;
        case "submarine":
          if(this.selected[0]+2 < 10 && this.checkForSpace(3)){
            if(this.ships[3].placed == true){
              this.test[this.ships[3].y][this.ships[3].x] = "water";
              this.test[this.ships[3].y+1][this.ships[3].x] = "water";
              this.test[this.ships[3].y+2][this.ships[3].x] = "water";
            }
            this.test[this.selected[0]][this.selected[1]] = "submarine1";
            this.test[this.selected[0]+1][this.selected[1]] = "submarine2";
            this.test[this.selected[0]+2][this.selected[1]] = "submarine3";
            this.ships[3].y = this.selected[0];
            this.ships[3].x = this.selected[1];
            this.ships[3].placed = true;
          }
          break;
        case "destroyer":
          if(this.selected[0]+2 < 10 && this.checkForSpace(3)){
            if(this.ships[2].placed == true){
              this.test[this.ships[2].y][this.ships[2].x] = "water";
              this.test[this.ships[2].y+1][this.ships[2].x] = "water";
              this.test[this.ships[2].y+2][this.ships[2].x] = "water";
            }
            this.test[this.selected[0]][this.selected[1]] = "destroyer1";
            this.test[this.selected[0]+1][this.selected[1]] = "destroyer2";
            this.test[this.selected[0]+2][this.selected[1]] = "destroyer3";
            this.ships[2].y = this.selected[0];
            this.ships[2].x = this.selected[1];
            this.ships[2].placed = true;
          }
          break;
        case "battleship":
          if(this.selected[0]+3 < 10 && this.checkForSpace(4)){
            if(this.ships[1].placed == true){
              this.test[this.ships[1].y][this.ships[1].x] = "water";
              this.test[this.ships[1].y+1][this.ships[1].x] = "water";
              this.test[this.ships[1].y+2][this.ships[1].x] = "water";
              this.test[this.ships[1].y+3][this.ships[1].x] = "water";
            }
            this.test[this.selected[0]][this.selected[1]] = "battleship1";
            this.test[this.selected[0]+1][this.selected[1]] = "battleship2";
            this.test[this.selected[0]+2][this.selected[1]] = "battleship3";
            this.test[this.selected[0]+3][this.selected[1]] = "battleship4";
            this.ships[1].y = this.selected[0];
            this.ships[1].x = this.selected[1];
            this.ships[1].placed = true;
          }
          break;
        case "aircraftcarrier":
          if(this.selected[0]+4 < 10 && this.checkForSpace(5)){
            if(this.ships[0].placed == true){
              this.test[this.ships[0].y][this.ships[0].x] = "water";
              this.test[this.ships[0].y+1][this.ships[0].x] = "water";
              this.test[this.ships[0].y+2][this.ships[0].x] = "water";
              this.test[this.ships[0].y+3][this.ships[0].x] = "water";
              this.test[this.ships[0].y+4][this.ships[0].x] = "water";
            }
            this.test[this.selected[0]][this.selected[1]] = "aircraftcarrier1";
            this.test[this.selected[0]+1][this.selected[1]] = "aircraftcarrier2";
            this.test[this.selected[0]+2][this.selected[1]] = "aircraftcarrier3";
            this.test[this.selected[0]+3][this.selected[1]] = "aircraftcarrier4";
            this.test[this.selected[0]+4][this.selected[1]] = "aircraftcarrier5";
            this.ships[0].y = this.selected[0];
            this.ships[0].x = this.selected[1];
            this.ships[0].placed = true;
          }
          break;
        default:
          break;
      }   
    }
  }

  checkForSpace(size:number){
    for(let i = 0; i < size; i++){
      if(this.test[this.selected[0]+i][this.selected[1]] != "water" && !this.test[this.selected[0]+i][this.selected[1]].includes(this.selectedShip)){
        return false;
      }
    }
    return true;
  }
}
