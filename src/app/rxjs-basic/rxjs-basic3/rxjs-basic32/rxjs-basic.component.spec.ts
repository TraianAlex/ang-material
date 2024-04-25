import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsBasic32Component } from './rxjs-basic.component';

describe('RxjsBasicComponent', () => {
  let component: RxjsBasic32Component;
  let fixture: ComponentFixture<RxjsBasic32Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsBasic32Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxjsBasic32Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
