import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRequestStepperComponent } from './info-request-stepper.component';

describe('InfoRequestStepperComponent', () => {
	let component: InfoRequestStepperComponent;
	let fixture: ComponentFixture<InfoRequestStepperComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ InfoRequestStepperComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InfoRequestStepperComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
