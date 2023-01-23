import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';

import { MaterialModule } from '../material.module';
import { FootballStandingsRoutingModule } from './football-standings-routing.module';
import { Interceptor } from './services/app.interceptor';
import { FootballStandingsComponent } from './football-standings.component';
import { HeaderComponent } from './header/header.component';
import { StandingsComponent } from './standings/standings.component';
import { StandingService } from './services/standing.service';

@NgModule({
  declarations: [FootballStandingsComponent, HeaderComponent, StandingsComponent],
  imports: [CommonModule, HttpClientModule, FootballStandingsRoutingModule, MaterialModule],
  providers: [HttpClient, StandingService, { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
})
export class FootballStandingsModule {}
