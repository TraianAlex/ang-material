import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsBasic31Component } from './rxjs-basic.component';

describe('RxjsBasicComponent', () => {
  let component: RxjsBasic31Component;
  let fixture: ComponentFixture<RxjsBasic31Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsBasic31Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxjsBasic31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
