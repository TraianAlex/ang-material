import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FootballStandingsComponent } from './football-standings.component';

const routes: Routes = [{ path: '', component: FootballStandingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FootballStandingsRoutingModule { }
