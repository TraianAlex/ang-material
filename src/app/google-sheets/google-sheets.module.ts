import { NgModule } from '@angular/core';

import { GoogleSheetsRoutingModule } from './google-sheets.routing.module';
import { GoogleSheetsComponent } from './google-sheets.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [],
  imports: [GoogleSheetsRoutingModule, GoogleSheetsComponent, ContentComponent],
})
export class GoogleSheetsModule {}
