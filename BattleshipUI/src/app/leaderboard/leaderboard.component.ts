import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IScore } from './score';
import { ScoreapiService } from '../services/scoreapi.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, AfterViewInit {

  scores: IScore[];
  displayedColumns: string[] = ['userId', 'scoreValue', 'gameTime'];
  dataSource: MatTableDataSource<IScore>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
  }

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
  }
}
