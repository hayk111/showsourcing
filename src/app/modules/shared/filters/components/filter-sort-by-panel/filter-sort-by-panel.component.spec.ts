import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSortByPanelComponent } from './filter-sort-by-panel.component';

describe('FilterSortByPanelComponent', () => {
	let component: FilterSortByPanelComponent;
	let fixture: ComponentFixture<FilterSortByPanelComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ FilterSortByPanelComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FilterSortByPanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
