import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameboardSetupComponent } from './gameboard-setup/gameboard-setup.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { RoomListComponent } from './room-list/room-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'game',
    component: GameComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'gameboard',
    component: GameBoardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gameboardsetup',
    component: GameboardSetupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
