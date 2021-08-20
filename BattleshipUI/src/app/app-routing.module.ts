import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameboardSetupComponent } from './gameboard-setup/gameboard-setup.component';
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
    path: 'gameboard',
    component: GameBoardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gameboardsetup',
    component: GameboardSetupComponent,
    canActivate: [AuthGuard]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
