import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Team } from '../models/team.model';
import { StandingService } from '../services/standing.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent {
  columnsToDisplay = [
    'position',
    'name',
    'points',
    'playedGames',
    'won',
    'draw',
    'lost',
    'goalsFor',
    'goalsAgainst',
    'goalDifference',
  ];

  teams$!: Observable<Team[]>;

  constructor(private standingService: StandingService) {}

  ngOnInit() {
    this.standingService.fetchStandings('premierLeague');
    this.teams$ = this.standingService.teams;
  }

  getStandings(league: any) {
    this.standingService.fetchStandings(league);
  }
}
