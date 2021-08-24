import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IScore } from './score';
import { ScoreapiService } from '../services/scoreapi.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface MockScore {
  scoreId: number,
  userId: number,
  scoreValue: number,
  gameTime: string
}

const MOCK_DATA : MockScore[] = 
[
  {
    "scoreId": 1,
    "userId": 1,
    "scoreValue": 0,
    "gameTime": "2021-08-06T18:58:21.753"
  },
  {
    "scoreId": 2,
    "userId": 2,
    "scoreValue": 4,
    "gameTime": "2021-08-13T05:58:54.375"
  },
  {
    "scoreId": 7,
    "userId": 2,
    "scoreValue": 6,
    "gameTime": "2021-08-06T18:58:21"
  },
  {
    "scoreId": 8,
    "userId": 1,
    "scoreValue": 8,
    "gameTime": "2021-08-06T18:58:21"
  },
  {
    "scoreId": 9,
    "userId": 1,
    "scoreValue": 11,
    "gameTime": "2021-08-05T18:58:21"
  },
  {
    "scoreId": 10,
    "userId": 2,
    "scoreValue": 11,
    "gameTime": "2021-08-05T14:54:21"
  },
  {
    "scoreId": 11,
    "userId": 1,
    "scoreValue": 31,
    "gameTime": "2021-08-04T12:53:16"
  },
  {
    "scoreId": 12,
    "userId": 2,
    "scoreValue": 31,
    "gameTime": "2021-08-04T12:53:16"
  },
  {
    "scoreId": 13,
    "userId": 2,
    "scoreValue": 15,
    "gameTime": "2021-08-03T10:33:26"
  },
  {
    "scoreId": 14,
    "userId": 1,
    "scoreValue": 9,
    "gameTime": "2021-08-03T10:33:26"
  }
];

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, AfterViewInit {

  scores: IScore[];
  displayedColumns: string[] = ['userId', 'scoreValue', 'gameTime'];
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
    MOCK_DATA.sort((a, b) => (a.scoreValue > b.scoreValue) ? -1 : 1);
    this.mockDataSource = new MatTableDataSource(MOCK_DATA);
    
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
