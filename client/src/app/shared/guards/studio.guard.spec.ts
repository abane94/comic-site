import { TestBed } from '@angular/core/testing';

import { StudioGuard } from './studio.guard';

describe('StudioGuard', () => {
  let guard: StudioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StudioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
