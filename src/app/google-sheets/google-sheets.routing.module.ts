import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GoogleSheetsComponent } from './google-sheets.component';

const routes: Routes = [
  { path: '', component: GoogleSheetsComponent },
  {
    path: 'content',
    loadComponent: () => import('./content/content.component').then((mod) => mod.ContentComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleSheetsRoutingModule {}
