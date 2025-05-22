import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

import { TrainingService } from '@services/training.service';
import { UiService } from '@services/ui.service';
import { Exercise } from '../exercise.model';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss'],
    standalone: false
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  // @Output() trainingStart = new EventEmitter<void>();
  // exercises: Exercise[] = [
  //   { value: 'crunches', viewValue: 'Crunches' },
  //   { value: 'touch-toes', viewValue: 'Touch Toes' },
  //   { value: 'side-lunges', viewValue: 'Side Lunges' },
  //   { value: 'burpees', viewValue: 'Burpees' },
  // ];
  exercises: Exercise[] | null = [];
  // exercises$!: Observable<Exercise[]>;
  exerciseSubscription!: Subscription;
  isLoading = false;
  private loadingSubs!: Subscription;

  constructor(
    private trainingService: TrainingService, // private firestore: Firestore,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    // this.exercises = this.trainingService.getAvailableExercises();

    // const data = collection(this.firestore, 'availableExercices');
    // this.exercises$ = collectionData(data);

    // this.exercises$ = this.firestore.collection<Exercise>('availableExercices').valueChanges();
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      (exercises) => (this.exercises = exercises)
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  // onStartTraining() {
  //   this.trainingStart.emit();
  // }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exerciseSubscription?.unsubscribe();
    this.loadingSubs?.unsubscribe();
  }
}
