import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsBasic22Component } from './rxjs-basic.component';

describe('RxjsBasicComponent', () => {
  let component: RxjsBasic22Component;
  let fixture: ComponentFixture<RxjsBasic22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsBasic22Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxjsBasic22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
