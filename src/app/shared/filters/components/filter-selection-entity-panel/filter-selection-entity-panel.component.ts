import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ERMService } from '~core/ORM/services/_global/erm.service';
import { ListQuery } from '~core/ORM/services/_global/list-query.interface';
import { ERM } from '~core/ORM/models';
import { Filter, FilterType } from '~shared/filters/models';
import { AutoUnsub } from '~utils';

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
	pending$ = new BehaviorSubject(false);
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
		if (this.type === FilterType.CREATED_BY || this.type === FilterType.ASSIGNEE)
			this.loadUserChoices();
		else if (this.type === FilterType.EVENT || this.type === FilterType.EVENTS)
			this.loadEventChoices();
		else
			this.loadChoices();


	}

	loadChoices() {
		// first we get the entity metadata of the filter
		const erm = ERM.getEntityMetadata(this.type as string);
		// we get the correct service
		const srv = this.ermSrv.getGlobalService(erm);
		// we get the items, but we just need the id and the name
		this.listResult = srv.getListQuery({ take: 40, sortBy: 'name', descending: false }, 'id, name');
		this.choices$ = this.listResult.items$.pipe(
			tap(_ => this.pending$.next(false)),
		);
		this.listResult.items$.connect();
	}

	loadUserChoices() {
		const srv = this.ermSrv.getGlobalService(ERM.USER);
		// we get the items, but we just need the id and the name
		this.listResult = srv.getListQuery(
			{ take: 40, sortBy: 'firstName', descending: false }, 'id, firstName, lastName ',
			Client.TEAM
		);
		this.choices$ = this.listResult.items$.pipe(
			tap(_ => this.pending$.next(false)),
		);
		this.listResult.items$.connect();
	}

	loadEventChoices() {
		// we get the correct service
		const srv = this.ermSrv.getGlobalService(ERM.EVENT);
		// we get the items, but we just need the id and the name
		this.listResult = srv.getListQuery(
			{ take: 40, sortBy: 'description.name', descending: false }, 'id, name, description { id, name }',
			Client.TEAM
		);
		this.choices$ = this.listResult.items$.pipe(
			tap(_ => this.pending$.next(false))
		);
		this.listResult.items$.connect();
	}

	/** filters the choices when the user types something in the search bar */
	search(value: string) {
		this.pending$.next(true);
		this.searchStr$.next(value);
	}

	filterChoices(value: string) {
		switch (this.type) {
			case FilterType.ASSIGNEE:
			case FilterType.CREATED_BY:
				this.listResult.refetch({
					query: `firstName CONTAINS[c] "${value}" OR lastName CONTAINS[c] "${value}"`
				}).subscribe(_ => this.pending$.next(false));
				break;
			case FilterType.EVENT:
			case FilterType.EVENTS:
				return this.listResult.refetch({
					query: `description.name CONTAINS[c] "${value}" OR name CONTAINS[c] "${value}"`
				}).subscribe(_ => this.pending$.next(false));
			default:
				this.listResult.refetch({ query: `name CONTAINS[c] "${value}"` }).subscribe(_ => this.pending$.next(false));
		}
	}

	loadMore() {
		this.choices$.pipe(take(1)).pipe(
			switchMap(choices => this.listResult.fetchMore())
		).subscribe();
	}

	onItemAdded(entity) {
		this.filterAdded.emit({ type: this.type, value: entity.id, entity });
	}

	onItemRemoved(entity) {
		this.filterRemoved.emit({ type: this.type, value: entity.id, entity });
	}

	formatDisplayName(type: string, choice) {
		switch (type) {
			case FilterType.ASSIGNEE:
			case FilterType.CREATED_BY:
				return `${choice.lastName} ${choice.firstName}`;
			case FilterType.EVENT:
			case FilterType.EVENTS:
				return `${choice.description.name}`;
			default:
				return choice.name;
		}
	}

}
