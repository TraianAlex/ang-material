import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsBasic3Component } from './rxjs-basic.component';

describe('RxjsBasicComponent', () => {
  let component: RxjsBasic3Component;
  let fixture: ComponentFixture<RxjsBasic3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsBasic3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxjsBasic3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
