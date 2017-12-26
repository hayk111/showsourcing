import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInputsSelectorsComponent } from './test-inputs-selectors.component';

describe('TestInputsSelectorsComponent', () => {
	let component: TestInputsSelectorsComponent;
	let fixture: ComponentFixture<TestInputsSelectorsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ TestInputsSelectorsComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestInputsSelectorsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
