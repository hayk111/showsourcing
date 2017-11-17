import { TestBed, inject } from '@angular/core/testing';

import { TasksLoaderService } from './tasks-loader.service';

describe('TasksLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksLoaderService]
    });
  });

  it('should be created', inject([TasksLoaderService], (service: TasksLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
