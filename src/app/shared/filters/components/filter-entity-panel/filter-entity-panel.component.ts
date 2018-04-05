import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Filter } from '~shared/filters/models';
import { Store } from '@ngrx/store';
import { selectEntityArray } from '~entity/store/entity.selector';
import { Observable } from 'rxjs/Observable';
import { Entity } from '~app/entity';
import { Subject } from 'rxjs/Subject';
import { AutoUnsub } from '~app/app-root/utils';
import { takeUntil, debounceTime } from 'rxjs/operators';

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
	@Input() type;
	@Input() title = '';
	private searchStr$ = new Subject<string>();

	/** Different choices that are displayed in the view */
	@Input() set choices(value: Array<Entity>) {
		this._choices = value;
	}
	get choices(): Array<Entity> {
		// choices can be filtered with a search input, therefor filteredChoices is only gonna be populated
		// when the user has typed something
		return this._filteredChoices || this._choices;
	}
	private _choices = [];
	private _filteredChoices;

	/** a search function to search through the choices. Default check if the name includes a string */
	@Input() searchFn: Function = (choice, str) => str === '' ? true : choice.name.includes(str);

	ngOnInit(): void {
		this.searchStr$.pipe(takeUntil(this._destroy$), debounceTime(400)).subscribe(str => this.filterChoices(str));
	}

	/** filters the choices when the user types something in the search bar */
	search(value: string) {
		this.searchStr$.next(value);
	}

	filterChoices(str: string) {
		this._filteredChoices = this._choices.filter(choice => this.searchFn(choice, str));
	}

	onItemAdded(id) {
		this.filterAdded.emit({ type: this.type, value: id });
	}

	onItemRemoved(id) {
		this.filterRemoved.emit({ type: this.type, value: id });
	}
}
