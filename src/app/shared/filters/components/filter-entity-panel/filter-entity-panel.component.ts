import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AutoUnsub } from '~app-root/utils';
import { Filter, FilterType } from '~shared/filters/models';

// this is the entity panel that appears once a filter button has been clicked
// a list of choices is displayed and the user can pick through those choices
@Component({
	selector: 'filter-entity-panel-app',
	templateUrl: './filter-entity-panel.component.html',
	styleUrls: ['./filter-entity-panel.component.scss'],
})
export class FilterEntityPanelComponent extends AutoUnsub implements OnInit {

	@Output() filterAdded = new EventEmitter<Filter>();
	@Output() filterRemoved = new EventEmitter<Filter>();
	@Input() selected = new Map<string, boolean>();
	@Input() type: FilterType;
	@Input() title = '';
	private searchStr$ = new Subject<string>();


	/** Different choices that are displayed in the view */
	@Input()
	set choices(value: Array<any>) {
		this._choices = value;
	}
	get choices(): Array<any> {
		// choices can be filtered with a search input, therefor filteredChoices is only gonna be populated
		// when the user has typed something
		return this._filteredChoices || this._choices;
	}
	private _choices = [];
	private _filteredChoices;

	/** The relevant choices (with count) */
	@Input()
	set relevantChoices(value: Array<any>) {
		this._relevantChoices = value;
	}
	get relevantChoices(): Array<any> {
		return this._filteredRelevantChoices || this._relevantChoices;
	}
	private _relevantChoices = [];
	private _filteredRelevantChoices;

	/** a search function to search through the choices. Default check if the name includes a string */
	@Input() searchFn: Function = (choice, str) => str === '' ? true : choice.name.includes(str);

	trackByFn = (index, item) => item.id;

	ngOnInit(): void {
		this.searchStr$.pipe(takeUntil(this._destroy$), debounceTime(400)).subscribe(str => this.filterChoices(str));
	}

	/** filters the choices when the user types something in the search bar */
	search(value: string) {
		this.searchStr$.next(value);
	}

	filterChoices(str: string) {
		this._filteredChoices = this._choices.filter(choice => this.searchFn(choice, str));
		// Commented for testing
		// this._filteredRelevantChoices = this._relevantChoices.filter(choice => this.searchFn(choice, str));
		// need to trigger change detection even though an event happened. It's because the search is pushed to an observable etc.
		this.cd.markForCheck();
	}

	onItemAdded(value) {
		this.filterAdded.emit({ type: this.type, value: value.id, raw: value });
	}

	onItemRemoved(value) {
		this.filterRemoved.emit({ type: this.type, value: value.id, raw: value });
	}

	constructor(private cd: ChangeDetectorRef) {
		super();
	}
}
