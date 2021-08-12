import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';

import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { RegisterComponent } from "./register/register.component";
import { GameBoardComponent } from './game-board/game-board.component';
import { GameboardSetupComponent } from './gameboard-setup/gameboard-setup.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'game',
    component: GameComponent,
    //canActivate: [ AuthGuardService ]  // disabled for now to show routing to game component
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'gameboard',
    component: GameBoardComponent,
  },
  {
    path: 'gameboardsetup',
    component: GameboardSetupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
