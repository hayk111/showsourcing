import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelectOneComponent } from './input-select-one.component';

describe('InputSelectOneComponent', () => {
	let component: InputSelectOneComponent;
	let fixture: ComponentFixture<InputSelectOneComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ InputSelectOneComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InputSelectOneComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
