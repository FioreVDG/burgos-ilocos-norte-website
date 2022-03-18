import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnnouncememntComponent } from './add-announcememnt.component';

describe('AddAnnouncememntComponent', () => {
  let component: AddAnnouncememntComponent;
  let fixture: ComponentFixture<AddAnnouncememntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnnouncememntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnnouncememntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
