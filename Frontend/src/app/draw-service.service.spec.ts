import { TestBed } from '@angular/core/testing';

import { DrawServiceService } from './draw-service.service';

describe('DrawServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DrawServiceService = TestBed.get(DrawServiceService);
    expect(service).toBeTruthy();
  });
});
