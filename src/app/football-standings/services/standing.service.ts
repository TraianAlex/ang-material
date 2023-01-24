import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Team } from '../models/team.model';
import { ApiRespone } from '../models/api.model';
import { debug, LoggingLevel } from 'src/app/shared/debug';

@Injectable({
  providedIn: 'root',
})
export class StandingService {
  private _teams: Subject<Array<Team>> = new BehaviorSubject<Array<Team>>([]);
  private readonly API = 'https://api.football-data.org/v2/competitions/';
  private readonly leagues = {
    fifafWorldCup: 'WC',
    uefaChampionsLeague: 'CL',
    europeanChampionship: 'EC',
    bundesliga: 'BL1',
    premierLeague: 'PL',
    englandChampionship: 'ELC',
    serieA: 'SA',
    primeraDivision: 'PD',
    leagueOne: 'FL1',
    eredivisie: 'DED',
    primeiraLiga: 'PPL',
    copaLibertadores: 'CLI',
    brazilianSerieA: 'BSA',
  };

  public readonly teams: Observable<Array<Team>> = this._teams.asObservable();

  constructor(private http: HttpClient) {}

  fetchStandings(league: keyof typeof this.leagues): void {
    this.http
      .get<ApiRespone>(`${this.API}${this.leagues[`${league}`]}/standings`)
      .pipe(debug(LoggingLevel.ERROR, 'Loading standings from backend'))
      .subscribe((response: ApiRespone) => {
        this._teams.next(response.standings[0].table);
      });
  }
}
