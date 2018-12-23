import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, takeUntil, tap, take, switchMap } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { AutoUnsub } from '~utils';
import { Filter, FilterType } from '~shared/filters/models';
import { EntityMetadata, ERM } from '~models';
import { ERMService } from '~entity-services/_global/erm.service';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ListQuery } from '~entity-services/_global/list-query.interface';

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
	@Input() selected = new Map<string, Filter>();
	@Input() type: FilterType;
	pending$ = new BehaviorSubject(true);
	/** List result */
	listResult: ListQuery<any>;
	/** Different choices that are displayed in the view */
	choices$: Observable<any[]>;
	/** obs of the searched string */
	private searchStr$ = new Subject<string>();


	constructor(private ermSrv: ERMService) {
		super();
	}

	ngOnInit(): void {
		this.searchStr$.pipe(
			takeUntil(this._destroy$),
			debounceTime(400)
		).subscribe(str => this.filterChoices(str));

		if (this.type === FilterType.CREATED_BY) {
			this.loadUserChoices();
		} else {
			this.loadChoices();
		}

	}

	loadChoices() {
		// first we get the entity metadata of the filter
		const erm = ERM.getEntityMetadata(this.type as string);
		// we get the correct service
		const srv = this.ermSrv.getGlobalService(erm);
		// we get the items, but we just need the id and the name
		this.listResult = srv.getListQuery({ take: 40, sortBy: 'name' }, 'id, name');
		this.choices$ = this.listResult.items$.pipe(
			tap(_ => this.pending$.next(false)),
		);
	}

	loadUserChoices() {
		// we get the correct service
		const srv = this.ermSrv.getGlobalService(ERM.USER);
		// we get the items, but we just need the id and the name
		this.listResult = srv.getListQuery(
			{ take: 40, sortBy: 'firstName' }, 'id, firstName, lastName ',
			Client.TEAM
		);
		this.choices$ = this.listResult.items$.pipe(
			tap(_ => this.pending$.next(false)),
		);
	}

	/** filters the choices when the user types something in the search bar */
	search(value: string) {
		this.pending$.next(true);
		this.searchStr$.next(value);
	}

	filterChoices(value: string) {
		switch (this.type) {
			case FilterType.CREATED_BY:
				this.listResult.refetch({
					query: `firstName CONTAINS[c] "${value}" OR lastName CONTAINS[c] "${value}"`
				}).subscribe();
				break;
			default:
				this.listResult.refetch({ query: `name CONTAINS[c] "${value}"` }).subscribe();
		}
	}

	loadMore() {
		this.choices$.pipe(take(1)).pipe(
			switchMap(choices => this.listResult.fetchMore())
		);
	}

	onItemAdded(entity) {
		this.filterAdded.emit({ type: this.type, value: entity.id, entity });
	}

	onItemRemoved(entity) {
		this.filterRemoved.emit({ type: this.type, value: entity.id, entity });
	}

	formatDisplayName(type: string, choice) {
		switch (type) {
			case FilterType.CREATED_BY:
				return `${choice.lastName} ${choice.firstName}`;
			default:
				return choice.name;
		}
	}

}
