import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithArchivedButtonComponent } from './with-archived-button.component';

describe('WithArchivedButtonComponent', () => {
	let component: WithArchivedButtonComponent;
	let fixture: ComponentFixture<WithArchivedButtonComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ WithArchivedButtonComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(WithArchivedButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
