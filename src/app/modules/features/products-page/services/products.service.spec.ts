import { TestBed, inject } from '@angular/core/testing';


describe('ProductsService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ProductsService]
		});
	});

	it('should be created', inject([ProductsService], (service: ProductsService) => {
		expect(service).toBeTruthy();
	}));
});
