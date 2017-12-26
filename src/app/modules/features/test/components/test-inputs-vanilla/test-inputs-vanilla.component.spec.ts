import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInputsVanillaComponent } from './test-inputs-vanilla.component';

describe('TestInputsVanillaComponent', () => {
	let component: TestInputsVanillaComponent;
	let fixture: ComponentFixture<TestInputsVanillaComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ TestInputsVanillaComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestInputsVanillaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
