import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GoogleSheetsComponent } from './google-sheets.component';

const routes: Routes = [{ path: '', component: GoogleSheetsComponent }];
// path: '', loadComponent: () => import('./google-sheets.component').then((mod) => mod.GoogleSheetsComponent) },

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleSheetsRoutingModule {}
