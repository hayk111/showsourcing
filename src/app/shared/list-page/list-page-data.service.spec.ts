import { TestBed } from '@angular/core/testing';

import { ListPageDataService } from './list-page-data.service';

describe('ListPageService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: ListPageDataService<any, any> = TestBed.get(ListPageDataService);
		expect(service).toBeTruthy();
	});
});
