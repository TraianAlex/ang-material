import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsBasic1Component } from './rxjs-basic.component';

describe('RxjsBasicComponent', () => {
  let component: RxjsBasic1Component;
  let fixture: ComponentFixture<RxjsBasic1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsBasic1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxjsBasic1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
