import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Exercise } from '../training/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  // private availableExercises: Exercise[] = [
  //   { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
  //   { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
  //   { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
  //   { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  // ];
  private availableExercises: Exercise[] = [];
  private runningExercise!: Exercise;
  // private finishedExercises: Exercise[] = [];
  private fbSubs: Subscription[] = [];

  constructor(
    // private firestore: Firestore,
    private firestore2: AngularFirestore
  ) {}

  fetchAvailableExercises() {
    // return this.availableExercises.slice();
    this.fbSubs.push(
      this.firestore2
        .collection<Exercise>('availableExercices')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((doc) => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data().name,
                duration: doc.payload.doc.data().duration,
                calories: doc.payload.doc.data().calories,
              };
            });
          })
        )
        .subscribe({
          next: (exercises: Exercise[]) => {
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
          },
          // error: (error) => {
          //   console.log(error);
          // },
        })
    );
  }

  startExercise(selectedId: string) {
    // this.firestore2.doc('availableExercices/' + selectedId).update({ lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find((ex) => ex.id === selectedId) as Exercise;
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null || ({} as Exercise);
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null || ({} as Exercise);
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    //return this.finishedExercises.slice();
    this.fbSubs.push(
      this.firestore2
        .collection<Exercise>('finishedExercises')
        .valueChanges()
        .subscribe({
          next: (exercises: Exercise[]) => {
            this.finishedExercisesChanged.next(exercises);
          },
          // error: (error) => {
          //   console.log(error);
          // },
        })
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach((sub) => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.firestore2.collection('finishedExercises').add(exercise);
  }
}
