import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselEntityComponent } from './carousel-entity.component';

describe('CarouselEntityComponent', () => {
	let component: CarouselEntityComponent;
	let fixture: ComponentFixture<CarouselEntityComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ CarouselEntityComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CarouselEntityComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
