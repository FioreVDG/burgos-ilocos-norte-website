import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoMeaningComponent } from './logo-meaning.component';

describe('LogoMeaningComponent', () => {
  let component: LogoMeaningComponent;
  let fixture: ComponentFixture<LogoMeaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoMeaningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoMeaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
