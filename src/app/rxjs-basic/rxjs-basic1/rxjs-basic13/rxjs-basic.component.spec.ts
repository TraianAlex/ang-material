import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsBasic13Component } from './rxjs-basic.component';

describe('RxjsBasicComponent', () => {
  let component: RxjsBasic13Component;
  let fixture: ComponentFixture<RxjsBasic13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsBasic13Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxjsBasic13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
