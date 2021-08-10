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
  }

  ngOnInit(): void {
  }

  select(i:number, j:number){
    this.selected[0] = i;
    this.selected[1] = j;
    this.test[i][j] = "patrolboat1";
    this.test[i+1][j] = "patrolboat2";
  }
}
