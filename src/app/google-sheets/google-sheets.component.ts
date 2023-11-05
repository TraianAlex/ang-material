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
  // range: A1:A6 => obj, C1:C3 => obj
  range = `A1:D6`;
  // range: H3:H3 => string, H5 => string
  cell = `H3:H3`;
  sheetData!: any[];
  dataByRange!: any[];
  cellData!: string | undefined;

  constructor(private sheetService: GsService) {}

  ngOnInit() {
    // all sheet data
    this.sheetService
      .getSheetData(`${this.sheetName}`)
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
    // get by a specific range
    this.sheetService
      .getSheetData(`${this.sheetName}!${this.range}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.sheetService.hasColumn(this.range);
          this.dataByRange = data;
          console.log(data);
        },
        error: (error) => {
          console.error(error);
        },
      });
    // get one cell
    this.sheetService
      .getSheetData(`${this.sheetName}!${this.cell}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.cellData = this.sheetService.getOneCell(data, this.cell);
          console.log(this.sheetService.getOneCell(data, this.cell));
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
