import { Component, OnInit } from '@angular/core';
import { IGameboard } from '../services/gameboard';

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
  ship: string;

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
    this.ship = "";
  }

  ngOnInit(): void {
  }

  select(i:number, j:number){
    this.selected[0] = i;
    this.selected[1] = j;
    switch (this.ship) {
      case "patrolboat":
        this.test[i][j] = "patrolboat1";
        this.test[i+1][j] = "patrolboat2";
        break;
      case "submarine":
        this.test[i][j] = "submarine1";
        this.test[i+1][j] = "submarine2";
        this.test[i+2][j] = "submarine3";
        break;    
      default:
        break;
    }
    
  }

  selectShip(s:string){
    this.ship = s;
  }
}
