import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-rxjs-basic',
    imports: [MaterialModule, RouterLink, RouterOutlet],
    templateUrl: './rxjs-basic.component.html',
    styleUrls: ['./rxjs-basic.component.scss']
})
export class RxjsBasic1Component {}
