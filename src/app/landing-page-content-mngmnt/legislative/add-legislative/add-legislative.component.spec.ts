import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLegislativeComponent } from './add-legislative.component';

describe('AddLegislativeComponent', () => {
  let component: AddLegislativeComponent;
  let fixture: ComponentFixture<AddLegislativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLegislativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLegislativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
