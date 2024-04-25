import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsBasic33Component } from './rxjs-basic.component';

describe('RxjsBasicComponent', () => {
  let component: RxjsBasic33Component;
  let fixture: ComponentFixture<RxjsBasic33Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsBasic33Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxjsBasic33Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
