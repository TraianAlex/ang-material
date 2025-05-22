import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

type Department = {
  id: number;
  name: string;
};

@Component({
    selector: 'app-message-new',
    templateUrl: './message-new.component.html',
    styleUrls: ['./message-new.component.scss'],
    standalone: false
})
export class MessageNewComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  priorities: string[] = ['High', 'Medium', 'Low'];
  departments: Department[] = [
    {
      id: 1,
      name: 'Complaints',
    },
    {
      id: 2,
      name: 'Loyalty',
    },
    {
      id: 3,
      name: 'Promotions',
    },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      emailCtrl: ['', Validators.required],
      priorityCtrl: ['', Validators.required],
      departmentCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      messageCtrl: ['', Validators.required],
    });
  }

  getDepartmentName(department: Department) {
    return department ? department['name'] : '';
  }
}
