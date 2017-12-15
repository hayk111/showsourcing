import { TestBed, inject } from '@angular/core/testing';

import { AuthCardService } from './auth-card.service';

describe('AuthCardService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AuthCardService]
		});
	});

	it('should be created', inject([AuthCardService], (service: AuthCardService) => {
		expect(service).toBeTruthy();
	}));
});
