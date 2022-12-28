import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

import { TrainingService } from 'src/app/services/training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  // @Output() trainingStart = new EventEmitter<void>();
  // exercises: Exercise[] = [
  //   { value: 'crunches', viewValue: 'Crunches' },
  //   { value: 'touch-toes', viewValue: 'Touch Toes' },
  //   { value: 'side-lunges', viewValue: 'Side Lunges' },
  //   { value: 'burpees', viewValue: 'Burpees' },
  // ];
  // exercises: Exercise[] = [];
  exercises$!: Observable<Exercise[]>;

  constructor(
    private trainingService: TrainingService,
    // private firestore: Firestore,
    private firestore2: AngularFirestore
  ) {}

  ngOnInit(): void {
    // this.exercises = this.trainingService.getAvailableExercises();

    // const data = collection(this.firestore, 'availableExercices');
    // this.exercises$ = collectionData(data);

    // this.exercises$ = this.firestore.collection<Exercise>('availableExercices').valueChanges();
    this.exercises$ = this.firestore2
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
      );
  }

  // onStartTraining() {
  //   this.trainingStart.emit();
  // }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
