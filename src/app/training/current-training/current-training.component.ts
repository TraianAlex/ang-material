import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TrainingService } from 'src/app/services/training.service';

import { StopTrainingDialogComponent } from '../stop-training-dialog/stop-training-dialog.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer!: number | NodeJS.Timer;
  // @Output() trainingExit = new EventEmitter();

  constructor(private dialog: MatDialog, private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  onStop() {
    clearInterval(this.timer);
    this.openDialog();
  }

  private startOrResumeTimer() {
    const step = (this.trainingService.getRunningExercise().duration / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  private openDialog() {
    const dialogRef = this.dialog.open(StopTrainingDialogComponent, {
      width: '250px',
      data: { progress: this.progress },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`User chose ${result}`);
      if (result) {
        // this.trainingExit.emit();
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
