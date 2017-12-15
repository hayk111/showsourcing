import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuardService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AuthGuardService, { provide: AuthService, useValue: { login: () => {}, logout: () => {}}} ],
			imports: [ RouterTestingModule]
		});
	});

	it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
		expect(service).toBeTruthy();
	}));
});
