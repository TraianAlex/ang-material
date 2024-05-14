import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

import { GsService } from 'src/app/google-sheets/services/gs.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  providers: [GsService],
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  private sheetService = inject(GsService);
  // destroy$ = new Subject<void>();
  sheetName = 'content';
  from = 'A1';
  to = 'F2';
  dataByRange$!: Observable<any>;

  ngOnInit(): void {
    this.dataByRange$ = this.sheetService
      .getSheetDataByRange$(this.sheetName, this.from, this.to)
      // .pipe(takeUntil(this.destroy$))
      // .subscribe({
      //   next: (data: any) => {
      //     this.dataByRange = data;
      //     console.log(data);
      //   },
      //   error: (error) => {
      //     console.error(error);
      //   },
      // });
  }
}
