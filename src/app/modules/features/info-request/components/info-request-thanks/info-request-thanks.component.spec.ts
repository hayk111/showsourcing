import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRequestThanksComponent } from './info-request-thanks.component';

describe('InfoRequestThanksComponent', () => {
	let component: InfoRequestThanksComponent;
	let fixture: ComponentFixture<InfoRequestThanksComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ InfoRequestThanksComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InfoRequestThanksComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
