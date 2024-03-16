import { TestBed } from '@angular/core/testing';

import { TradingSummaryService } from './trading-summary.service';

describe('TradingSummaryService', () => {
  let service: TradingSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradingSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
