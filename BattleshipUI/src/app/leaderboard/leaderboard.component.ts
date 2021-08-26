import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IScore } from './score';
import { ScoreapiService } from '../services/scoreapi.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ITeamLeaderboard } from '../services/TeamLeaderboard';
import { ITeamScore } from '../services/TeamScore';
import { ILeaderboard } from '../services/ILeaderBoard';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
export interface MockScore {
  username: number,
  wins: number,
  winratio: number,
  position: number
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  TeamScores: ITeamLeaderboard;
  Leaderboard:ILeaderboard;
  SoloScoreboard:string;

  constructor(private ScoreApi:ScoreapiService) { 
    this.ScoreApi.GetTeamLeaderBoard().subscribe(response=> this.TeamScores = response);
    this.ScoreApi.GetIndividualLeaderboard().subscribe(response =>this.Leaderboard= response);
  }

  ngOnInit(): void 
  {

  }

/*   ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
    });

  } */

/*   getAllScore()
  {
    this.ScoreApi.getAllScores().subscribe(
      (response) => {
        this.scores = response;
        this.scores.sort((a, b) => (a.scoreValue > b.scoreValue) ? -1 : 1);  // sort array from greatest to least
        this.dataSource = new MatTableDataSource(Array.from(this.scores));
        console.log(this.scores);
      }
    )
    
  } */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }
}
