import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';

describe('AuthService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AuthService],
			imports: [ RouterTestingModule, HttpClientTestingModule,
				{ provide: Store, useValue: {select: () => {}, dispatch: () => {}}}
			]
		});
	});

	it('should be created', inject([AuthService], (service: AuthService) => {
		expect(service).toBeTruthy();
	}));
});
