import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransparencyFileComponent } from './add-transparency-file.component';

describe('AddTransparencyFileComponent', () => {
  let component: AddTransparencyFileComponent;
  let fixture: ComponentFixture<AddTransparencyFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTransparencyFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransparencyFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
