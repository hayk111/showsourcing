import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicInputComponent } from './dynamic-input.component';

describe('DynamicFormControlComponent', () => {
	let component: DynamicInputComponent;
	let fixture: ComponentFixture<DynamicInputComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DynamicInputComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DynamicInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
