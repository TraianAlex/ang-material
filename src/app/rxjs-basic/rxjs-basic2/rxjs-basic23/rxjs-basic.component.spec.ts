import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsBasic23Component } from './rxjs-basic.component';

describe('RxjsBasicComponent', () => {
  let component: RxjsBasic23Component;
  let fixture: ComponentFixture<RxjsBasic23Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsBasic23Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxjsBasic23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
