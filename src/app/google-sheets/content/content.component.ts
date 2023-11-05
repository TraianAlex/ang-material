import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { GsService } from 'src/app/google-sheets/services/gs.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  providers: [GsService],
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  sheetName = 'content';
  from = 'A1';
  to = 'F2';
  dataByRange!: any[];

  constructor(private sheetService: GsService) {}

  ngOnInit(): void {
    this.sheetService
      .getSheetDataByRange(this.sheetName, this.from, this.to)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.dataByRange = data;
          console.log(data);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  ngOnDestroy(): void {}
}
