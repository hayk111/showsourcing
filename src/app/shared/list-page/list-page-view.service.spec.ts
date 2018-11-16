import { TestBed } from '@angular/core/testing';

import { ListPageViewService } from './list-page-view.service';

describe('ListPageViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListPageViewService = TestBed.get(ListPageViewService);
    expect(service).toBeTruthy();
  });
});
