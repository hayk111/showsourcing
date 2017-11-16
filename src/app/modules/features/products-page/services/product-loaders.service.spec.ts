import { TestBed, inject } from '@angular/core/testing';

import { ProductLoadersService } from './product-loaders.service';

describe('ProductLoadersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductLoadersService]
    });
  });

  it('should be created', inject([ProductLoadersService], (service: ProductLoadersService) => {
    expect(service).toBeTruthy();
  }));
});
