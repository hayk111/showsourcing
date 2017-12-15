import { TestBed, inject } from '@angular/core/testing';

import { HttpApiRedirectorService } from './http-api-redirector.service';

describe('HttpApiRedirectorService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [HttpApiRedirectorService]
		});
	});

	it('should be created', inject([HttpApiRedirectorService], (service: HttpApiRedirectorService) => {
		expect(service).toBeTruthy();
	}));
});
