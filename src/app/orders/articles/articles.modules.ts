import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

import { ArticlesComponent } from './articles.component';

@NgModule({
  imports: [CommonModule, MatTreeModule, MatIconModule],
  declarations: [ArticlesComponent],
  exports: [ArticlesComponent],
})
export class ArticlesModule {}
