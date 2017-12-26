import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelectMultiComponent } from './input-select-multi.component';

describe('InputSelectMultiComponent', () => {
	let component: InputSelectMultiComponent;
	let fixture: ComponentFixture<InputSelectMultiComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ InputSelectMultiComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InputSelectMultiComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
