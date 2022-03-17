import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyHotlineComponent } from './emergency-hotline.component';

describe('EmergencyHotlineComponent', () => {
  let component: EmergencyHotlineComponent;
  let fixture: ComponentFixture<EmergencyHotlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencyHotlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyHotlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
