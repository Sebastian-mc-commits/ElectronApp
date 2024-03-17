import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validDataGuard } from './valid-data.guard';

describe('validDataGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validDataGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
