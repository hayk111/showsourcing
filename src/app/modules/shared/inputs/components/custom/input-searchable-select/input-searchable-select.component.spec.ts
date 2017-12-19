import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchableSelectComponent } from './input-searchable-select.component';

describe('InputSearchableSelectComponent', () => {
	let component: InputSearchableSelectComponent;
	let fixture: ComponentFixture<InputSearchableSelectComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ InputSearchableSelectComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InputSearchableSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
