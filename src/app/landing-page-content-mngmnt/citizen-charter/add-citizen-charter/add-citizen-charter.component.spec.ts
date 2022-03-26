import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCitizenCharterComponent } from './add-citizen-charter.component';

describe('AddCitizenCharterComponent', () => {
  let component: AddCitizenCharterComponent;
  let fixture: ComponentFixture<AddCitizenCharterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCitizenCharterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCitizenCharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
