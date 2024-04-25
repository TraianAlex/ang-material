import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsBasic21Component } from './rxjs-basic.component';

describe('RxjsBasicComponent', () => {
  let component: RxjsBasic21Component;
  let fixture: ComponentFixture<RxjsBasic21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsBasic21Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxjsBasic21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
