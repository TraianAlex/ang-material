import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'second-page',
    templateUrl: './second-page.component.html',
    styleUrls: ['./second-page.component.css'],
    imports: [MatCardModule]
})
export class SecondPageComponent {}
