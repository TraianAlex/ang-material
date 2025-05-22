import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';

import { GsService } from './services/gs.service';
import { environment } from '@env/environment';

@Component({
    imports: [CommonModule],
    providers: [GsService],
    selector: 'app-google-sheets',
    templateUrl: './google-sheets.component.html',
    styleUrls: ['./google-sheets.component.scss']
})
export class GoogleSheetsComponent implements OnInit, OnDestroy {
  private sheetService = inject(GsService);
  destroy$ = new Subject<void>();
  spreadsheetId = environment.gsSheetId;
  sheetName = 'experiences';
  rowData!: any[];
  sheetData$!: Observable<any>;
  cellData$!: Observable<any>;
  cell = 'H3';

  ngOnInit() {
    this.sheetData$ = this.sheetService
      .getSheetData$(this.spreadsheetId, this.sheetName)
      // .pipe(takeUntil(this.destroy$))
      // .subscribe({
      //   next: (data: any) => {
      //     this.sheetData = data;
      //     console.log('getSheetData', data);
      //   },
      //   error: (error) => {
      //     console.error(error);
      //   },
      // });

    this.cellData$ = this.sheetService
      .getOneCell(this.spreadsheetId, this.sheetName, this.cell)
      // .pipe(takeUntil(this.destroy$))
      // .subscribe({
      //   next: (data: any) => {
      //     this.cellData = data;
      //     console.log('one cell -> ', data);
      //   },
      //   error: (error) => {
      //     console.error(error);
      //   },
      // });

    this.sheetService
      .getRawData$(this.spreadsheetId, this.sheetName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.rowData = data;
          console.table(data);
          let htmlData = '';
          for (const [one, two, three] of data) {
            console.log(`${one} | ${two} | ${three}`);
            htmlData += `<tr><td>${one}</td><td>${two}</td><td>${three}</td></tr>`;
          }
          document.getElementById('myTable')!.innerHTML = htmlData;
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
