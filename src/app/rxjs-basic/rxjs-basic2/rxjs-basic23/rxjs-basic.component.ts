import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { FirstPageComponent } from './FirstPage/first-page.component';
import { SecondPageComponent } from './SecondPage/second-page.component';

@Component({
  selector: 'app-rxjs-basic',
  standalone: true,
  imports: [MaterialModule, RouterLink, FirstPageComponent, SecondPageComponent],
  templateUrl: './rxjs-basic.component.html',
  styleUrls: ['./rxjs-basic.component.scss'],
})
export class RxjsBasic23Component {
  displayFirstPage = true;

  constructor() {}

  togglePages() {
    this.displayFirstPage = !this.displayFirstPage;
  }
}
