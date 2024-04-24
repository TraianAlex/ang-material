import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsBasic2Component } from './rxjs-basic.component';

describe('RxjsBasicComponent', () => {
  let component: RxjsBasic2Component;
  let fixture: ComponentFixture<RxjsBasic2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsBasic2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxjsBasic2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
