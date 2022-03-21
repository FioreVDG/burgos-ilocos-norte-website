import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicServantsComponent } from './public-servants.component';

describe('PublicServantsComponent', () => {
  let component: PublicServantsComponent;
  let fixture: ComponentFixture<PublicServantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicServantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicServantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
