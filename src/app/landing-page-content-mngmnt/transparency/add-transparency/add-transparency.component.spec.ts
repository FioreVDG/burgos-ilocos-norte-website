import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransparencyComponent } from './add-transparency.component';

describe('AddTransparencyComponent', () => {
  let component: AddTransparencyComponent;
  let fixture: ComponentFixture<AddTransparencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTransparencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransparencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
