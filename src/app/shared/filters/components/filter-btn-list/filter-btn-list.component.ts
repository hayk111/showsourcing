import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Filter } from '~shared/filters';


/**
 * displays a label with its active filters under it. If no active filters it displays a btn, ence the name
 */
@Component({
	selector: 'filter-btn-list-app',
	templateUrl: './filter-btn-list.component.html',
	styleUrls: ['./filter-btn-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterBtnListComponent {
	/** btns displayed */
	@Input() filterBtns: string[] = [];
	/** for each buttons the filters applied */
	@Input() filterMap: Map<string, Filter[]>;
	/** whether we display a checkbox for favorite */
	@Input() hasFavoriteFilter = true;
	/** whether we display a checkbox for archived */
	@Input() hasArchivedFilter = true;
	/** when the filter button is clicked */
	@Output() btnClicked = new EventEmitter<string>();
	/** when we want to reset a certain filter type */
	@Output() reset = new EventEmitter<string>();
	/** remove filter */
	@Output() addFilter = new EventEmitter<Filter>();
	@Output() removeFilter = new EventEmitter<Filter>();
}
