import { Component } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-rep-dialog',
    templateUrl: './rep-dialog.component.html',
    styleUrls: ['./rep-dialog.component.scss'],
    standalone: false
})
export class RepDialogComponent {
  rep!: string;

  constructor() // public dialogRef: MatDialogRef<RepDialogComponent>,
  // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  {}

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
}
