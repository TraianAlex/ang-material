import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-stop-training-dialog',
    templateUrl: './stop-training-dialog.component.html',
    styleUrls: ['./stop-training-dialog.component.scss'],
    standalone: false
})
export class StopTrainingDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
