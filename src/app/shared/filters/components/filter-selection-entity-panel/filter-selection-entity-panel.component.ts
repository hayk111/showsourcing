import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { ListQuery } from '~core/erm';
import { Filter, FilterService, FilterType } from '~core/filters';
import { ListHelper2Service } from '~core/list-page2/list-helper-2.service';
import { PropertyOptionsService } from '~shared/selectors/services/property-options.service';
import { AutoUnsub } from '~utils';
import { Typename, api, ISearchOptions } from 'showsourcing-api-lib';
import { SortService } from '~shared/table/services/sort.service';
import { PaginationService } from '~shared/pagination/services/pagination.service';
import { IStatusType } from 'showsourcing-api-lib/dist/services/api/collections';

export function filterTypeToTypename(type: FilterType): Typename {
	switch (type) {
		case FilterType.ASSIGNEE:
		case FilterType.CREATED_BY:
			return 'TeamUser';
		// case FilterType.TAGS:
		case FilterType.TAG:
		case FilterType.CATEGORY:
		case FilterType.CATEGORIES:
			return 'PropertyOption';
		case FilterType.PRODUCT:
			return 'Product';
		case FilterType.PROJECT:
		// case FilterType.PROJECTS:
			return 'Project';
		case FilterType.SUPPLIER:
		case FilterType.SUPPLIERS:
			return 'Supplier';
		case FilterType.STATUS:
			return 'WorkflowStatus';
		case FilterType.EVENT:
			return 'Event';
	}
}

// this is the entity panel that appears once a filter button has been clicked
// a list of choices is displayed and the user can pick through those choices
@Component({
	selector: 'filter-selection-entity-panel-app',
	templateUrl: './filter-selection-entity-panel.component.html',
	styleUrls: ['./filter-selection-entity-panel.component.scss'],
	providers: [
		FilterService,
		SortService,
		PropertyOptionsService,
		ListHelper2Service,
		PaginationService,
	],
})
export class FilterSelectionEntityPanelComponent extends AutoUnsub implements OnInit {
	@Output() filterAdded = new EventEmitter<Filter>();
	@Output() filterRemoved = new EventEmitter<Filter>();
	@Input() selected = new Set<string>();
	@Input() type: FilterType;
	/** the typenameFiltered is used to specify the type of entities e.g. WorkflowStatus => "PRODUCT" */
	@Input() typenameFiltered: Typename;
	pending$ = new BehaviorSubject(false);
	/** List result */
	listResult: ListQuery<any>;
	/** Different choices that are displayed in the view */
	choices$: Observable<any[]>;
	private typename: Typename;

	constructor(
		public filterSrv: FilterService /** this is the filter service just for this panel search */,
		private propertyOptionSrv: PropertyOptionsService,
		private listHelper: ListHelper2Service
	) {
		super();
	}

	ngOnInit(): void {
		this.typename = filterTypeToTypename(this.type);
		const findFn = this.getCustomFindFn();
		const searchedFields = this.getSearchedFields();
		this.filterSrv.setup([], searchedFields);
		this.listHelper.setup(this.typename, this._destroy$, findFn);
		this.choices$ = this.listHelper.data$;
	}

	loadMore() {
		this.listHelper.loadMore();
	}

	onItemAdded(entity) {
		this.filterAdded.emit(this._buildFilter(entity));
	}

	onItemRemoved(entity) {
		this.filterRemoved.emit(this._buildFilter(entity));
	}

	/** build the filter object to add/remove */
	private _buildFilter(entity): Filter {
		let value = entity.id;
		// if we use some nested entities, we could want to pass the nested id as value.
		// e.g. TeamUser is used to display User. we can pass user.id
		if (entity.__typename === 'TeamUser') {
			value = entity.user?.id;
		}
		return {
			type: this.type,
			value,
			displayValue: this.formatDisplayName(this.type, entity),
		};
	}

	formatDisplayName(type: string, choice) {
		switch (type) {
			case FilterType.ASSIGNEE:
			case FilterType.CREATED_BY:
				return `${choice.user.firstName} ${choice.user.lastName}`;
			case FilterType.EVENT:
			case FilterType.EVENTS:
				return `${choice.description.name}`;
			case FilterType.CATEGORY:
			case FilterType.TAG:
				return choice.value;
			default:
				return choice.name;
		}
	}

	getCustomFindFn() {
		let findFn;
		switch (this.type) {
			case FilterType.TAG:
			case FilterType.CATEGORY:
				findFn = (options: ISearchOptions) => {
					return api.PropertyOption.findByType$(this.type.toUpperCase(), options);
				};
				break;
			case FilterType.STATUS:
				findFn = (options: ISearchOptions) => {
					return api.WorkflowStatus.findByType$(
						this.typenameFiltered.toUpperCase() as IStatusType,
						options
					);
				};
				break;
		}
		return findFn;
	}

	getSearchedFields() {
		if (this.typename === 'PropertyOption') {
			return ['value'];
		}
		return ['name'];
	}
}
