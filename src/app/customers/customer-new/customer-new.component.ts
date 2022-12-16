import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RepDialogComponent } from '../rep-dialog/rep-dialog.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.scss'],
})
export class CustomerNewComponent implements OnInit {
  emailFormControl!: FormControl;
  matcher = new MyErrorStateMatcher();

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  }

  openRepDialog() {
    const dialogRef = this.dialog.open(RepDialogComponent, {
      width: '250px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      alert(`User chose ${result}`);
    });
  }

  openUndoSnackbar() {
    const snackbarRef = this.snackBar.open('Customer saved', 'UNDO', {
      horizontalPosition: 'end',
    });
    snackbarRef.onAction().subscribe(() => {
      alert('Undo that save!');
    });
  }
}
