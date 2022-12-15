import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSidenavModule],
  exports: [CommonModule, MatButtonModule, MatIconModule, MatSidenavModule],
})
export class MaterialModule {}
