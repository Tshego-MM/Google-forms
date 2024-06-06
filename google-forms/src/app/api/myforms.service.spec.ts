import { TestBed } from '@angular/core/testing';

import { MyformsService } from './myforms.service';

describe('MyformsService', () => {
  let service: MyformsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyformsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
