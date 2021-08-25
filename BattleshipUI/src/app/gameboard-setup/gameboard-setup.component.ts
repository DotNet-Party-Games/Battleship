import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { BattleshipDeployService } from '../services/battleship-deploy.service';
import { GameStateService } from '../services/gamestate.service';
import { RoomService } from '../services/room.service';
import { Ship } from '../services/ship';
import { Orientation, Airplane } from '../services/airplane';

@Component({
  selector: 'app-gameboard-setup',
  templateUrl: './gameboard-setup.component.html',
  styleUrls: ['./gameboard-setup.component.css']
})
export class GameboardSetupComponent implements OnInit {

  width: number[];
  height: number[];
  selected: number[] = new Array(2);  // holds the x,y coords for placing a ship (only tracking 1 endpoint)
  test: string[][][] = new Array(10);  // array for placeholder space to test if ship/airplane can be placed
  selectedShip: string;  // name of the ship selected to be placed
  isVertical: boolean = false;  // isRotated
  ships: Ship[] = new Array(5);
  roomNum: number;
  userId: string;  // this can now be username
  opponentId: string;  // this can also now be username
  shipsDeployed: boolean;
  roomId:string;
  opponentReady:boolean=false;
  viewBoard: string = "air";  // tells the browser which gameboard to actively view; default should be "sea"
  airplanes: Airplane[] = new Array(4);
  airplanesDeployed: boolean;
  airplaneOrientation: Orientation;
  selectedAirplane: string;

  constructor(public auth: AuthService, private deploy:BattleshipDeployService, private router:Router, private roomservice:RoomService, private gamestate:GameStateService) {
    this.height = new Array(10);
    this.width = new Array(10);

    for(let i = 0; i < 10; i++){
      this.test[i] = new Array(10);
      for(let j=0; j<10; j++){
        this.test[i][j]=new Array(2);
        this.test[i][j][0] = "water";
        this.test[i][j][1] = "air";
      }
    }
    this.selected[0] = 0;
    this.selected[1] = 0;
    this.selectedShip = "";
    this.selectedAirplane = "";

    for(let i =0; i < 5; i++){
      this.ships[i] = new Ship;
    }

    // this might be in an if?
    for (let i = 0; i < 4; i++) {
      this.airplanes[i] = new Airplane;
    }

    this.deploy.roomnum.subscribe(response=> this.roomNum=response);
    this.opponentId = "0";
    this.userId = "2";
    this.shipsDeployed = false;
    this.airplanesDeployed = false;
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
    this.roomservice.currentRoom.subscribe(response => {this.roomNum= parseInt(response.id), console.log("Room num: "+response.id)});

    this.gamestate.startingNavy.ocean = new Array(10);
    this.gamestate.startingNavy.oceanLegend = new Array(10);
    for (let i = 0; i < 10; i ++) {
      this.gamestate.startingNavy.ocean[i] = new Array(10);
      this.gamestate.startingNavy.oceanLegend[i] = new Array(10);
      for(let j = 0; j < 10; j ++) {
        this.gamestate.startingNavy.ocean[i][j] = new Array(2);
        this.gamestate.startingNavy.oceanLegend[i][j] = new Array(2);
        this.gamestate.startingNavy.ocean[i][j][0] = 0;
        this.gamestate.startingNavy.oceanLegend[i][j][0] = "water";
      }
    }
    this.gamestate.opponentReady.subscribe(turn=>this.opponentReady=turn);
  }
/*   SetUpRoom() {
    if (this.roomNum && this.userId && this.opponentId) {
		this.BApi.Reset(this.roomNum).subscribe(
		  (response) => {
			this.BApi.SetUp(this.roomNum, this.userId, this.opponentId).subscribe(
			  response => { console.log(response["user1"]);  // probably don't need to console log this?
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
  } */

  selectWaterSpace(i:number, j:number){
    this.selected[0] = i;
    this.selected[1] = j;
    this.placeShip();
  }

  selectAirSpace(i:number, j:number) {
    this.selected[0] = i;
    this.selected[1] = j;
    this.placeAirplane();
  }

  selectShip(s:string){
    this.selectedShip = s;
  }

  selectAirplane(s:string) {
    this.selectedAirplane = s;
    console.log(this.selectedAirplane + "has been selected!");
  }

  placeShip(){
    if(this.isVertical==true){
      switch (this.selectedShip) {
        case "patrolboat":
          if(this.selected[0]+1 < 10 && this.checkForSpace(2)){
            if(this.ships[4].placed == true){
              this.clearShip(this.ships[4],2);
            }
            this.test[this.selected[0]][this.selected[1]][0] = "patrolboatr1";
            this.test[this.selected[0]+1][this.selected[1]][0] = "patrolboatr2";
            this.ships[4].y = this.selected[0];
            this.ships[4].x = this.selected[1];
            this.ships[4].placed = true;
            this.ships[4].horizontal = false;
          }
          else
          {
            this.CannotPlaceError("sea");
          }
          break;
        case "submarine":
          if(this.selected[0]+2 < 10 && this.checkForSpace(3)){
            if(this.ships[3].placed == true){
              this.clearShip(this.ships[3],3);
            }
            this.test[this.selected[0]][this.selected[1]][0] = "submariner1";
            this.test[this.selected[0]+1][this.selected[1]][0] = "submariner2";
            this.test[this.selected[0]+2][this.selected[1]][0] = "submariner3";
            this.ships[3].y = this.selected[0];
            this.ships[3].x = this.selected[1];
            this.ships[3].placed = true;
            this.ships[3].horizontal = false;
          }
          else
          {
            this.CannotPlaceError("sea");
          }
          break;
        case "destroyer":
          if(this.selected[0]+2 < 10 && this.checkForSpace(3)){
            if(this.ships[2].placed == true){
              this.clearShip(this.ships[2],3);
            }
            this.test[this.selected[0]][this.selected[1]][0] = "destroyerr1";
            this.test[this.selected[0]+1][this.selected[1]][0] = "destroyerr2";
            this.test[this.selected[0]+2][this.selected[1]][0] = "destroyerr3";
            this.ships[2].y = this.selected[0];
            this.ships[2].x = this.selected[1];
            this.ships[2].placed = true;
            this.ships[2].horizontal = false;
          }
          else
          {
            this.CannotPlaceError("sea");
          }
          break;
        case "battleship":
          if(this.selected[0]+3 < 10 && this.checkForSpace(4)){
            if(this.ships[1].placed == true){
              this.clearShip(this.ships[1],4);
            }
            this.test[this.selected[0]][this.selected[1]][0] = "battleshipr1";
            this.test[this.selected[0]+1][this.selected[1]][0] = "battleshipr2";
            this.test[this.selected[0]+2][this.selected[1]][0] = "battleshipr3";
            this.test[this.selected[0]+3][this.selected[1]][0] = "battleshipr4";
            this.ships[1].y = this.selected[0];
            this.ships[1].x = this.selected[1];
            this.ships[1].placed = true;
            this.ships[1].horizontal = false;
          }
          else
          {
            this.CannotPlaceError("sea");
          }
          break;
        case "aircraftcarrier":
          if(this.selected[0]+4 < 10 && this.checkForSpace(5)){
            if(this.ships[0].placed == true){
              this.clearShip(this.ships[0],5);
            }
            this.test[this.selected[0]][this.selected[1]][0] = "aircraftcarrierr1";
            this.test[this.selected[0]+1][this.selected[1]][0] = "aircraftcarrierr2";
            this.test[this.selected[0]+2][this.selected[1]][0] = "aircraftcarrierr3";
            this.test[this.selected[0]+3][this.selected[1]][0] = "aircraftcarrierr4";
            this.test[this.selected[0]+4][this.selected[1]][0] = "aircraftcarrierr5";
            this.ships[0].y = this.selected[0];
            this.ships[0].x = this.selected[1];
            this.ships[0].placed = true;
            this.ships[0].horizontal = false;
          }
          else
          {
            this.CannotPlaceError("sea");
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
            this.test[this.selected[0]][this.selected[1]][0] = "patrolboat1";
            this.test[this.selected[0]][this.selected[1]+1][0] = "patrolboat2";
            this.ships[4].y = this.selected[0];
            this.ships[4].x = this.selected[1];
            this.ships[4].placed = true;
            this.ships[4].horizontal = true;
          }
          else
          {
            this.CannotPlaceError("sea");
          }
          break;
        case "submarine":
          if(this.selected[1]+2 < 10 && this.checkForSpace(3)){
            if(this.ships[3].placed == true){
              this.clearShip(this.ships[3],3);
            }
            this.test[this.selected[0]][this.selected[1]][0] = "submarine1";
            this.test[this.selected[0]][this.selected[1]+1][0] = "submarine2";
            this.test[this.selected[0]][this.selected[1]+2][0] = "submarine3";
            this.ships[3].y = this.selected[0];
            this.ships[3].x = this.selected[1];
            this.ships[3].placed = true;
            this.ships[3].horizontal = true;
          }
          else
          {
            this.CannotPlaceError("sea");
          }
          break;
        case "destroyer":
          if(this.selected[1]+2 < 10 && this.checkForSpace(3)){
            if(this.ships[2].placed == true){
              this.clearShip(this.ships[2],3);
            }
            this.test[this.selected[0]][this.selected[1]][0] = "destroyer1";
            this.test[this.selected[0]][this.selected[1]+1][0] = "destroyer2";
            this.test[this.selected[0]][this.selected[1]+2][0] = "destroyer3";
            this.ships[2].y = this.selected[0];
            this.ships[2].x = this.selected[1];
            this.ships[2].placed = true;
            this.ships[2].horizontal = true;
          }
          else
          {
            this.CannotPlaceError("sea");
          }
          break;
        case "battleship":
          if(this.selected[1]+3 < 10 && this.checkForSpace(4)){
            if(this.ships[1].placed == true){
              this.clearShip(this.ships[1],4);
            }
            this.test[this.selected[0]][this.selected[1]][0] = "battleship1";
            this.test[this.selected[0]][this.selected[1]+1][0] = "battleship2";
            this.test[this.selected[0]][this.selected[1]+2][0] = "battleship3";
            this.test[this.selected[0]][this.selected[1]+3][0] = "battleship4";
            this.ships[1].y = this.selected[0];
            this.ships[1].x = this.selected[1];
            this.ships[1].placed = true;
            this.ships[1].horizontal = true;
          }
          else
          {
            this.CannotPlaceError("sea");
          }
          break;
        case "aircraftcarrier":
          if(this.selected[1]+4 < 10 && this.checkForSpace(5)){
            if(this.ships[0].placed == true){
              this.clearShip(this.ships[0],5);
            }
            this.test[this.selected[0]][this.selected[1]][0] = "aircraftcarrier1";
            this.test[this.selected[0]][this.selected[1]+1][0] = "aircraftcarrier2";
            this.test[this.selected[0]][this.selected[1]+2][0] = "aircraftcarrier3";
            this.test[this.selected[0]][this.selected[1]+3][0] = "aircraftcarrier4";
            this.test[this.selected[0]][this.selected[1]+4][0] = "aircraftcarrier5";
            this.ships[0].y = this.selected[0];
            this.ships[0].x = this.selected[1];
            this.ships[0].placed = true;
            this.ships[0].horizontal = true;
          }
          else
          {
            this.CannotPlaceError("sea");
          }
          break;
        default:
          break;
      }   
    }
  }

  placeAirplane() {

  }

  resetShip(ship:string){
    switch(ship){
      case "patrolboat":
        this.clearShip(this.ships[4], 2);
        this.ships[4].placed=false;
        break;
      case "submarine":
        this.clearShip(this.ships[3], 3);
        this.ships[3].placed=false;
        break;
      case "destroyer":
        this.clearShip(this.ships[2], 3);
        this.ships[2].placed=false;
        break;
      case "battleship":
        this.clearShip(this.ships[1], 4);
        this.ships[1].placed=false;
        break;
      case "aircraftcarrier":
        this.clearShip(this.ships[0], 5);
        this.ships[0].placed=false;
        break;
      default:
        break;
    }
    this.shipsDeployed = false;
  }

  resetAirplane(airplane:string) {

  }

  isShipPlaced(ship:number){
    if(this.ships[ship].placed){
      return true;
    }
    else{
      return false;
    }
  }

  isAirplanePlaced(airplane:number) {
    if (this.airplanes[airplane].placed) {
      return true;
    }
    
    return false;
  }

  checkForSpace(size:number){
    for(let i = 0; i < size; i++){
      if(this.isVertical == true){
        if(this.test[this.selected[0]+i][this.selected[1]][0] != "water" && !this.test[this.selected[0]+i][this.selected[1]].includes(this.selectedShip)){
          return false;
        }
      }
      else{
        if(this.test[this.selected[0]][this.selected[1]+i][0] != "water" && !this.test[this.selected[0]][this.selected[1]+i].includes(this.selectedShip)){
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
        this.test[s.y+i][s.x][0] = "water";
      }
      else{
        this.test[s.y][s.x+i][0] = "water";
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
/*     for(let i = 0; i < 5; i++){
      this.submitPlaceShip(i, this.ships[i]);
    } */
/*     this.BApi.DeployShips(this.roomNum, this.userId).subscribe(
      response => {console.log(response["user1"])}
    ); */
    this.shipsDeployed = true;
    this.sendtoserver();
  }

/*   submitPlaceShip(shipId:number, pship:Ship){
    this.BApi.PlaceShip(this.roomNum, this.userId, shipId, pship.x, pship.y, 0, pship.horizontal).subscribe(
      response => { console.log(response.user1) }
    );
  } */


/*   tempSetUp(){
    this.BApi.SetUp(1,"1","2").subscribe(
      response => {console.log(response["user1"])}
    );
  } */
  sendtoserver(){
    //do i need to send room number as well?
    // this.deploy.sendboard(this.ships, this.roomNum, this.userId);
    // console.log(this.ships, this.roomNum, this.userId);
    this.gamestate.startingNavy.oceanLegend=this.test;
    this.gamestate.InterpretOcean(this.gamestate.startingNavy.ocean,this.gamestate.startingNavy.oceanLegend);
    this.gamestate.SendPlayerBoard(this.gamestate.startingNavy);
    if(this.opponentReady){
      this.gamestate.StartGame();
    }else{
      this.gamestate.ReadyUp();
    }
  }

  LeaveRoom(){
    this.deploy.leaveRoom();
    this.router.navigate(["/game"]);
  }

  CannotPlaceError(s:string){
    if (s === "sea") {
      alert("Can't place {"+ this.selectedShip + "} at location {" + this.selected[0] + "," + this.selected[1]+ "}!");
    } else if (s === "air") {
      alert("Can't place {"+ this.selectedAirplane + "} at location {" + this.selected[0] + "," + this.selected[1]+ "}!");
    }
    
  }
}
