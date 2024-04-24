import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsBasic11Component } from './rxjs-basic.component';

describe('RxjsBasicComponent', () => {
  let component: RxjsBasic11Component;
  let fixture: ComponentFixture<RxjsBasic11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsBasic11Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxjsBasic11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
