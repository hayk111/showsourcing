import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRequestFormComponent } from './info-request-form.component';

describe('InfoRequestFormComponent', () => {
	let component: InfoRequestFormComponent;
	let fixture: ComponentFixture<InfoRequestFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ InfoRequestFormComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InfoRequestFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
