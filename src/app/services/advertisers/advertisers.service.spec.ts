import { TestBed, inject } from '@angular/core/testing';

import { AdvertisersService } from './advertisers.service';

describe('AdvertisersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvertisersService]
    });
  });

  it('should be created', inject([AdvertisersService], (service: AdvertisersService) => {
    expect(service).toBeTruthy();
  }));
});
