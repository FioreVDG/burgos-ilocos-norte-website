import { TestBed } from '@angular/core/testing';

import { CitizenCharterService } from './citizen-charter.service';

describe('CitizenCharterService', () => {
  let service: CitizenCharterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitizenCharterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
