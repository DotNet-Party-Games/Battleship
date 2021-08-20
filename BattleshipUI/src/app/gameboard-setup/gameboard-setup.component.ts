import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BattleshipAPIService } from '../services/battleship-api.service';
import { Ship } from '../services/ship';

@Component({
  selector: 'app-gameboard-setup',
  templateUrl: './gameboard-setup.component.html',
  styleUrls: ['./gameboard-setup.component.css']
})
export class GameboardSetupComponent implements OnInit {

  width: number[];
  height: number[];
  selected: number[] = new Array(2);  // holds the x,y coords for placing a ship (only tracking 1 endpoint)
  test: string[][] = new Array(10);  // array for placeholder space to test if ship can be placed
  selectedShip: string;  // name of the ship selected to be placed
  isVertical: boolean = true;  // isRotated
  ships: Ship[] = new Array(5);
  roomNum: number;
  userId: string;  // this can now be username
  opponentId: string;  // this can also now be username
  shipsDeployed: boolean;

  constructor(private BApi: BattleshipAPIService, public auth: AuthService) {
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
    this.selectedShip = "No Ship currently selected";

    for(let i =0; i < 5; i++){
      this.ships[i] = new Ship;
    }

    this.roomNum = 0;
    this.opponentId = "";
    this.userId = "1";
    this.shipsDeployed = false;
    /*this.auth.idTokenClaims$.subscribe(
      (response) => {
        console.log(response);
        if (response?.iat) {
          this.userId = response.iat
        }
      }
    );*/
  }

  ngOnInit(): void {
  }

  SetUpRoom() {
    if (this.roomNum && this.userId && this.opponentId) {
      this.BApi.Reset(this.roomNum).subscribe(
        (response) => {
          this.BApi.SetUp(this.roomNum, this.userId, this.opponentId).subscribe(
            response => { 
              console.log(response["user1"]);  // probably don't need to console log this?
              alert("Room has been created!");
            }  
          );
        }
      )
    }
    else
    {
      alert("Need to have valid room number (not 0), user ID, and opponent ID!");
    }
    
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
              this.clearShip(this.ships[4],2);
            }
            this.test[this.selected[0]][this.selected[1]] = "patrolboat1";
            this.test[this.selected[0]+1][this.selected[1]] = "patrolboat2";
            this.ships[4].y = this.selected[0];
            this.ships[4].x = this.selected[1];
            this.ships[4].placed = true;
            this.ships[4].horizontal = false;
          }
          break;
        case "submarine":
          if(this.selected[0]+2 < 10 && this.checkForSpace(3)){
            if(this.ships[3].placed == true){
              this.clearShip(this.ships[3],3);
            }
            this.test[this.selected[0]][this.selected[1]] = "submarine1";
            this.test[this.selected[0]+1][this.selected[1]] = "submarine2";
            this.test[this.selected[0]+2][this.selected[1]] = "submarine3";
            this.ships[3].y = this.selected[0];
            this.ships[3].x = this.selected[1];
            this.ships[3].placed = true;
            this.ships[3].horizontal = false;
          }
          break;
        case "destroyer":
          if(this.selected[0]+2 < 10 && this.checkForSpace(3)){
            if(this.ships[2].placed == true){
              this.clearShip(this.ships[2],3);
            }
            this.test[this.selected[0]][this.selected[1]] = "destroyer1";
            this.test[this.selected[0]+1][this.selected[1]] = "destroyer2";
            this.test[this.selected[0]+2][this.selected[1]] = "destroyer3";
            this.ships[2].y = this.selected[0];
            this.ships[2].x = this.selected[1];
            this.ships[2].placed = true;
            this.ships[2].horizontal = false;
          }
          break;
        case "battleship":
          if(this.selected[0]+3 < 10 && this.checkForSpace(4)){
            if(this.ships[1].placed == true){
              this.clearShip(this.ships[1],4);
            }
            this.test[this.selected[0]][this.selected[1]] = "battleship1";
            this.test[this.selected[0]+1][this.selected[1]] = "battleship2";
            this.test[this.selected[0]+2][this.selected[1]] = "battleship3";
            this.test[this.selected[0]+3][this.selected[1]] = "battleship4";
            this.ships[1].y = this.selected[0];
            this.ships[1].x = this.selected[1];
            this.ships[1].placed = true;
            this.ships[1].horizontal = false;
          }
          break;
        case "aircraftcarrier":
          if(this.selected[0]+4 < 10 && this.checkForSpace(5)){
            if(this.ships[0].placed == true){
              this.clearShip(this.ships[0],5);
            }
            this.test[this.selected[0]][this.selected[1]] = "aircraftcarrier1";
            this.test[this.selected[0]+1][this.selected[1]] = "aircraftcarrier2";
            this.test[this.selected[0]+2][this.selected[1]] = "aircraftcarrier3";
            this.test[this.selected[0]+3][this.selected[1]] = "aircraftcarrier4";
            this.test[this.selected[0]+4][this.selected[1]] = "aircraftcarrier5";
            this.ships[0].y = this.selected[0];
            this.ships[0].x = this.selected[1];
            this.ships[0].placed = true;
            this.ships[0].horizontal = false;
          }
          break;
        default:
          break;
      }   
    }
    else{
      switch (this.selectedShip) {
        case "patrolboat":
          if(this.selected[1]+1 < 10 && this.checkForSpace(2)){
            if(this.ships[4].placed == true){
              this.clearShip(this.ships[4],2);
            }
            this.test[this.selected[0]][this.selected[1]] = "patrolboatr1";
            this.test[this.selected[0]][this.selected[1]+1] = "patrolboatr2";
            this.ships[4].y = this.selected[0];
            this.ships[4].x = this.selected[1];
            this.ships[4].placed = true;
            this.ships[4].horizontal = true;
          }
          break;
        case "submarine":
          if(this.selected[1]+2 < 10 && this.checkForSpace(3)){
            if(this.ships[3].placed == true){
              this.clearShip(this.ships[3],3);
            }
            this.test[this.selected[0]][this.selected[1]] = "submariner1";
            this.test[this.selected[0]][this.selected[1]+1] = "submariner2";
            this.test[this.selected[0]][this.selected[1]+2] = "submariner3";
            this.ships[3].y = this.selected[0];
            this.ships[3].x = this.selected[1];
            this.ships[3].placed = true;
            this.ships[3].horizontal = true;
          }
          break;
        case "destroyer":
          if(this.selected[1]+2 < 10 && this.checkForSpace(3)){
            if(this.ships[2].placed == true){
              this.clearShip(this.ships[2],3);
            }
            this.test[this.selected[0]][this.selected[1]] = "destroyerr1";
            this.test[this.selected[0]][this.selected[1]+1] = "destroyerr2";
            this.test[this.selected[0]][this.selected[1]+2] = "destroyerr3";
            this.ships[2].y = this.selected[0];
            this.ships[2].x = this.selected[1];
            this.ships[2].placed = true;
            this.ships[2].horizontal = true;
          }
          break;
        case "battleship":
          if(this.selected[1]+3 < 10 && this.checkForSpace(4)){
            if(this.ships[1].placed == true){
              this.clearShip(this.ships[1],4);
            }
            this.test[this.selected[0]][this.selected[1]] = "battleshipr1";
            this.test[this.selected[0]][this.selected[1]+1] = "battleshipr2";
            this.test[this.selected[0]][this.selected[1]+2] = "battleshipr3";
            this.test[this.selected[0]][this.selected[1]+3] = "battleshipr4";
            this.ships[1].y = this.selected[0];
            this.ships[1].x = this.selected[1];
            this.ships[1].placed = true;
            this.ships[1].horizontal = true;
          }
          break;
        case "aircraftcarrier":
          if(this.selected[1]+4 < 10 && this.checkForSpace(5)){
            if(this.ships[0].placed == true){
              this.clearShip(this.ships[0],5);
            }
            this.test[this.selected[0]][this.selected[1]] = "aircraftcarrierr1";
            this.test[this.selected[0]][this.selected[1]+1] = "aircraftcarrierr2";
            this.test[this.selected[0]][this.selected[1]+2] = "aircraftcarrierr3";
            this.test[this.selected[0]][this.selected[1]+3] = "aircraftcarrierr4";
            this.test[this.selected[0]][this.selected[1]+4] = "aircraftcarrierr5";
            this.ships[0].y = this.selected[0];
            this.ships[0].x = this.selected[1];
            this.ships[0].placed = true;
            this.ships[0].horizontal = true;
          }
          break;
        default:
          break;
      }   
    }
  }

  checkForSpace(size:number){
    for(let i = 0; i < size; i++){
      if(this.isVertical == true){
        if(this.test[this.selected[0]+i][this.selected[1]] != "water" && !this.test[this.selected[0]+i][this.selected[1]].includes(this.selectedShip)){
          return false;
        }
      }
      else{
        if(this.test[this.selected[0]][this.selected[1]+i] != "water" && !this.test[this.selected[0]][this.selected[1]+i].includes(this.selectedShip)){
          return false;
        }
      }
    }
    return true;
  }

  toggleVertical(){
    this.isVertical = !this.isVertical;
  }

  clearShip(s:Ship,size:number){
    for(let i=0; i<size; i++){
      if(s.horizontal == false){
        this.test[s.y+i][s.x] = "water";
      }
      else{
        this.test[s.y][s.x+i] = "water";
      }
    }
  }

  Deploy(){
    for(let i = 0; i < 5; i++){
      if(this.ships[i].placed == false){
        alert("Not all ships have been placed!");
        return;
      }
    }
    for(let i = 0; i < 5; i++){
      this.submitPlaceShip(i, this.ships[i]);
    }
    this.BApi.DeployShips(this.roomNum, this.userId).subscribe(
      response => {console.log(response["user1"])}
    );
    this.shipsDeployed = true;
  }

  submitPlaceShip(shipId:number, pship:Ship){
    this.BApi.PlaceShip(this.roomNum, this.userId, shipId, pship.x, pship.y, 0, pship.horizontal).subscribe(
      response => { console.log(response.user1) }
    );
  }

  tempSetUp(){
    this.BApi.SetUp(1,"1","2").subscribe(
      response => {console.log(response["user1"])}
    );
  }

}
