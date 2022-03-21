import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertAreYouSureComponent } from './alert-are-you-sure.component';

describe('AlertAreYouSureComponent', () => {
  let component: AlertAreYouSureComponent;
  let fixture: ComponentFixture<AlertAreYouSureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertAreYouSureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertAreYouSureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
