import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPagePortalComponent } from './landing-page-portal.component';

describe('LandingPagePortalComponent', () => {
  let component: LandingPagePortalComponent;
  let fixture: ComponentFixture<LandingPagePortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPagePortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPagePortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
