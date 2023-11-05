import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { GsService } from './services/gs.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  providers: [GsService],
  selector: 'app-google-sheets',
  templateUrl: './google-sheets.component.html',
  styleUrls: ['./google-sheets.component.scss'],
})
export class GoogleSheetsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  sheetName = 'experiences';
  cell = 'H3';
  sheetData!: any[];
  cellData!: string | undefined;

  constructor(private sheetService: GsService) {}

  ngOnInit() {
    this.sheetService
      .getSheetData(this.sheetName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.sheetData = data;
          console.log(data);
        },
        error: (error) => {
          console.error(error);
        },
      });
    this.sheetService
      .getOneCell(this.sheetName, this.cell)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.cellData = data;
          console.log('one cell -> ', data);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
