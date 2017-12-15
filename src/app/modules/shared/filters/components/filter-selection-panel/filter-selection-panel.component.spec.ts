import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSelectionPanelComponent } from './filter-selection-panel.component';

describe('FilterSelectionPanelComponent', () => {
	let component: FilterSelectionPanelComponent;
	let fixture: ComponentFixture<FilterSelectionPanelComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ FilterSelectionPanelComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FilterSelectionPanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
