import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rxjs-basic',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './rxjs-basic.component.html',
  styleUrls: ['./rxjs-basic.component.scss'],
})
export class RxjsBasic21Component {}
