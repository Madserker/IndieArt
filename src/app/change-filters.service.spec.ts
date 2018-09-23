import { TestBed } from '@angular/core/testing';

import { ChangeFiltersService } from './change-filters.service';

describe('ChangeFiltersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeFiltersService = TestBed.get(ChangeFiltersService);
    expect(service).toBeTruthy();
  });
});
