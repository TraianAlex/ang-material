import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaterialModule } from '@app/material.module';

@Component({
  selector: 'app-rxjs-basic',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterLink, RouterOutlet],
  templateUrl: './rxjs-basic.component.html',
  styleUrls: ['./rxjs-basic.component.scss'],
})
export class RxjsBasic3Component {}
