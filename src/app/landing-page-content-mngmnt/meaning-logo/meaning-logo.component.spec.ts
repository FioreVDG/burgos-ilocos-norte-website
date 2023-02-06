import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeaningLogoComponent } from './meaning-logo.component';

describe('MeaningLogoComponent', () => {
  let component: MeaningLogoComponent;
  let fixture: ComponentFixture<MeaningLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeaningLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeaningLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
