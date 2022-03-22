import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegislativeComponent } from './legislative.component';

describe('LegislativeComponent', () => {
  let component: LegislativeComponent;
  let fixture: ComponentFixture<LegislativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegislativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegislativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
