import { Component, EventEmitter, Output } from '@angular/core';

interface Exercise {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent {
  @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[] = [
    { value: 'crunches', viewValue: 'Crunches' },
    { value: 'touch-toes', viewValue: 'Touch Toes' },
    { value: 'side-lunges', viewValue: 'Side Lunges' },
    { value: 'burpees', viewValue: 'Burpees' },
  ];

  onStartTraining() {
    this.trainingStart.emit();
  }
}
