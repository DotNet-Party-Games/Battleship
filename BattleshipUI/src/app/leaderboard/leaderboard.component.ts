import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IScore } from './score';
import { ScoreapiService } from '../services/scoreapi.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
export class LeaderboardComponent implements OnInit, AfterViewInit {

  scores: IScore[];
  displayedColumns: string[] = ['position', 'username', 'wins', 'winratio'];
  dataSource: MatTableDataSource<IScore>;
  mockDataSource: MatTableDataSource<MockScore>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
  }

  @ViewChild(MatSort) mockSort: MatSort;

  constructor(private ScoreApi:ScoreapiService) { 
    this.scores = new Array<IScore>();
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void 
  {
    this.getAllScore();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
    });
    this.dataSource.sort = this.sort;
    this.mockDataSource.sort = this.mockSort;
  }

  getAllScore()
  {
    this.ScoreApi.getAllScores().subscribe(
      (response) => {
        this.scores = response;
        this.scores.sort((a, b) => (a.scoreValue > b.scoreValue) ? -1 : 1);  // sort array from greatest to least
        this.dataSource = new MatTableDataSource(Array.from(this.scores));
        console.log(this.scores);
      }
    )
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.mockDataSource.filter = filterValue.trim().toLowerCase();
  }
}
