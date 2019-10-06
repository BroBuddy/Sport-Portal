import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LeagueComponent } from './league/league.component';
import { LeagueDetailComponent } from './league/league-detail/league-detail.component';
import { TeamComponent } from './team/team.component';
import { TeamDetailComponent } from './team/team-detail/team-detail.component';
import { PlayerComponent } from './player/player.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'league',
    children: [
      {
        path: '',
        component: LeagueComponent
      },
      {
        path: ':id',
        component: LeagueDetailComponent
      }
    ]
  },
  {
    path: 'team',
    children: [
      {
        path: '',
        component: TeamComponent
      },
      {
        path: ':id',
        component: TeamDetailComponent
      }
    ]
  },
  {
    path: 'player',
    children: [
      {
        path: '',
        component: PlayerComponent
      },
      {
        path: ':id',
        component: PlayerDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { preloadingStrategy: PreloadAllModules }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
