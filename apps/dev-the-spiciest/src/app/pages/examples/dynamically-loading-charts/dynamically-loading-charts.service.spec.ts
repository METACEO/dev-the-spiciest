import { TestBed } from '@angular/core/testing';

import { DynamicallyLoadingChartsService } from './dynamically-loading-charts.service';

describe('DynamicallyLoadingChartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicallyLoadingChartsService = TestBed.get(DynamicallyLoadingChartsService);
    expect(service).toBeTruthy();
  });
});
