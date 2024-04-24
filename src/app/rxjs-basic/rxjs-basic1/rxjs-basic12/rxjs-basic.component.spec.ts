import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsBasic12Component } from './rxjs-basic.component';

describe('RxjsBasicComponent', () => {
  let component: RxjsBasic12Component;
  let fixture: ComponentFixture<RxjsBasic12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsBasic12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxjsBasic12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
