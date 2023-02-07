import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographicInfoComponent } from './geographic-info.component';

describe('GeographicInfoComponent', () => {
  let component: GeographicInfoComponent;
  let fixture: ComponentFixture<GeographicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeographicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeographicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
