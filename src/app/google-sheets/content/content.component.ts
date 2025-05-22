import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

import { Character, GsService, characterAttributesMapping } from '@app/google-sheets/services/gs.service';
import { environment } from '@env/environment';

@Component({
    imports: [CommonModule],
    providers: [GsService],
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  private sheetService = inject(GsService);
  // destroy$ = new Subject<void>();
  spreadsheetId = environment.gsSheetId;
  spreadsheetId2 = environment.characters.spreadsheetId;
  sheetName = 'content';
  sheetName2 = 'characters';
  from = 'A1';
  to = 'F2';
  dataByRange$!: Observable<any>;
  activeCharacters$!: Observable<Character[]>;
  activeCharacters2$!: Observable<Character[]>;

  ngOnInit(): void {
    this.dataByRange$ = this.sheetService.getSheetDataByRange$(this.spreadsheetId, this.sheetName, this.from, this.to);
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

    this.activeCharacters$ = this.sheetService.getActive<Character>(
      this.spreadsheetId,
      this.sheetName2,
      characterAttributesMapping,
      'Active'
    );

    this.activeCharacters2$ = this.sheetService.getActive<Character>(
      this.spreadsheetId2,
      this.sheetName2,
      characterAttributesMapping,
      'Active'
    );
  }

  writeTestData(): void {
    this.sheetService.updateData();
  }
}
