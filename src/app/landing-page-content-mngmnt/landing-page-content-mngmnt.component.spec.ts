import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageContentMngmntComponent } from './landing-page-content-mngmnt.component';

describe('LandingPageContentMngmntComponent', () => {
  let component: LandingPageContentMngmntComponent;
  let fixture: ComponentFixture<LandingPageContentMngmntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageContentMngmntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageContentMngmntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
