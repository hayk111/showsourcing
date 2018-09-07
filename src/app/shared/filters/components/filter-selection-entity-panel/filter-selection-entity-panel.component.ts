import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { AutoUnsub } from '~utils';
import { Filter, FilterType } from '~shared/filters/models';

// this is the entity panel that appears once a filter button has been clicked
// a list of choices is displayed and the user can pick through those choices
@Component({
	selector: 'filter-selection-entity-panel-app',
	templateUrl: './filter-selection-entity-panel.component.html',
	styleUrls: ['./filter-selection-entity-panel.component.scss'],
})
export class FilterSelectionEntityPanelComponent extends AutoUnsub implements OnInit {

	@Output() filterAdded = new EventEmitter<Filter>();
	@Output() filterRemoved = new EventEmitter<Filter>();
	// map id, filter
	@Input() selected = new Map<string, Filter>();
	@Input() type: FilterType;
	// @Input() title = '';
	/** Different choices that are displayed in the view */
	choices$: Observable<any[]>;
	/** obs of the searched string */
	private searchStr$ = new Subject<string>();

	trackByFn = (index, item) => item.id;

	ngOnInit(): void {
		this.searchStr$.pipe(
			takeUntil(this._destroy$),
			debounceTime(400)
		).subscribe(str => this.filterChoices(str));
	}

	/** filters the choices when the user types something in the search bar */
	search(value: string) {
		this.searchStr$.next(value);
	}

	filterChoices(str: string) {
		this.cd.markForCheck();
	}

	addFilter(entity) {
		this.filterAdded.emit({ type: this.type, value: entity.id, entity });
	}

	removeFilter(entity) {
		this.filterRemoved.emit({ type: this.type, value: entity.id, entity });
	}

	constructor(private cd: ChangeDetectorRef) {
		super();
	}

	formatDisplayName(type: string, choice) {
		if (type === 'event' && choice.description) {
			return choice.description.name;
		} else if (type === 'createdBy') {
			return `${choice.user.lastName} ${choice.user.firstName}`;
		} else {
			return choice.name;
		}
	}
}
