import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransparencyComponent } from './view-transparency.component';

describe('ViewTransparencyComponent', () => {
  let component: ViewTransparencyComponent;
  let fixture: ComponentFixture<ViewTransparencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTransparencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTransparencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
