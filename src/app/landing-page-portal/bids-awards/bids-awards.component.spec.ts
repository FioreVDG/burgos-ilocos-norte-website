import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidsAwardsComponent } from './bids-awards.component';

describe('BidsAwardsComponent', () => {
  let component: BidsAwardsComponent;
  let fixture: ComponentFixture<BidsAwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidsAwardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidsAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
