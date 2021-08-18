import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
// import { IScore } from '../leaderboard/score';

export interface IScore
{
  userId: string,
  scoreValue: number,
  gameTime: Date
}

@Injectable({
  providedIn: 'root'
})
export class ScoreapiService {

  private url = "https://localhost:5001/api/"
  //private url = "https://battleship-tsw.azurewebsites.net/api/"

  constructor(private http: HttpClient) { }

  // getUserStats(userId: number) : Observable<IStatistic>
  // {
  //   return this.http.get<IStatistic>(this.url + "Statistic" + "/get/" + userId.toString);
  // }
  getAllScores() : Observable<IScore[]>
  {
    return this.http.get<IScore[]>(this.url + "Score");
  }
}
