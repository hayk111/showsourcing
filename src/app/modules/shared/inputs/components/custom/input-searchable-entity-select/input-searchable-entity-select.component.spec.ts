import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchableEntitySelectComponent } from './input-searchable-entity-select.component';

describe('InputSearchableEntitySelectComponent', () => {
	let component: InputSearchableEntitySelectComponent;
	let fixture: ComponentFixture<InputSearchableEntitySelectComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ InputSearchableEntitySelectComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InputSearchableEntitySelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
