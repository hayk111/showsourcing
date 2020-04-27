import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListQuery } from '~core/erm';
import { Typename } from '~core/erm3/typename.type';
import { Filter, FilterService, FilterType } from '~core/filters';
import { ListHelperService } from '~core/list-page2';
import { isLocalList } from '~core/list-page2/is-local-list.function';
import { ListFuseHelperService } from '~core/list-page2/list-fuse-helper.service';
import { AutoUnsub } from '~utils';


export function filterTypeToTypename(type: FilterType): Typename {
	switch (type) {
		case FilterType.ASSIGNEE:
		case FilterType.CREATED_BY:
			return 'TeamUser';
		case FilterType.CATEGORY:
		case FilterType.CATEGORIES:
			return 'Category';
		case FilterType.PRODUCT:
			return 'Product';
		case FilterType.PROJECT:
		case FilterType.PROJECTS:
			return 'Project';
		case FilterType.SUPPLIER:
		case FilterType.SUPPLIERS:
			return 'Supplier';
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
		ListHelperService,
	]
})
export class FilterSelectionEntityPanelComponent extends AutoUnsub implements OnInit {

	@Output() filterAdded = new EventEmitter<Filter>();
	@Output() filterRemoved = new EventEmitter<Filter>();
	@Input() selected = new Set<string>();
	@Input() type: FilterType;
	pending$ = new BehaviorSubject(false);
	/** List result */
	listResult: ListQuery<any>;
	/** Different choices that are displayed in the view */
	choices$: Observable<any[]>;
	private typename: Typename;
	private isLocalList: boolean;


	constructor(
		public filterSrv: FilterService, /** this is the filter service just for this panel search */
		private listHelper: ListHelperService,
		private fuseHelper: ListFuseHelperService
	) {
		super();
	}

	ngOnInit(): void {
		// TODO do the filterSrv, searched fields setup for teamUser etc
		this.typename = filterTypeToTypename(this.type);
		this.isLocalList = isLocalList(this.typename);
		if (isLocalList) {
			this.fuseHelper.setup(this.typename);
			this.choices$ = this.fuseHelper.searchedItems$;
		} else {
			this.listHelper.setup(this.typename);
			this.choices$ = this.listHelper.filteredItems$ as Observable<any[]>;
		}
	}

	loadMore() {
		if (isLocalList) {
			this.fuseHelper.loadMore();
		} else {
			this.listHelper.loadMore();
		}
	}

	onItemAdded(entity) {
		this.filterAdded.emit({
			type: this.type,
			value: entity.id,
			displayValue: this.formatDisplayName(this.type, entity)
		});
	}

	onItemRemoved(entity) {
		this.filterRemoved.emit({
			type: this.type,
			value: entity.id,
			displayValue: this.formatDisplayName(this.type, entity)
		});
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
