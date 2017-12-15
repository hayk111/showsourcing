import { TestBed, inject } from '@angular/core/testing';

import { InfoRequestFormBuilderService } from './info-request-form-builder.service';

describe('InfoRequestFormBuilderService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [InfoRequestFormBuilderService]
		});
	});

	it('should be created', inject([InfoRequestFormBuilderService], (service: InfoRequestFormBuilderService) => {
		expect(service).toBeTruthy();
	}));
});
