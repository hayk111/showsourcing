import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRequestIntroComponent } from './info-request-intro.component';

describe('InfoRequestIntroComponent', () => {
	let component: InfoRequestIntroComponent;
	let fixture: ComponentFixture<InfoRequestIntroComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ InfoRequestIntroComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InfoRequestIntroComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
