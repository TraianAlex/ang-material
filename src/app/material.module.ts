import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule],
  exports: [CommonModule, MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule],
})
export class MaterialModule {}
