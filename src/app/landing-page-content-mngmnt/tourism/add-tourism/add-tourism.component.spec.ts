import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTourismComponent } from './add-tourism.component';

describe('AddTourismComponent', () => {
  let component: AddTourismComponent;
  let fixture: ComponentFixture<AddTourismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTourismComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTourismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
