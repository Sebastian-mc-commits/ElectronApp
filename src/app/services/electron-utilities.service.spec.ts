import { TestBed } from '@angular/core/testing';

import { ElectronUtilitiesService } from './electron-utilities.service';

describe('ElectronUtilitiesService', () => {
  let service: ElectronUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectronUtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
