import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { ListQuery } from '~core/erm';
import { Filter, FilterService, FilterType } from '~core/filters';
import { ListHelper2Service } from '~core/list-page2/list-helper-2.service';
import { PropertyOptionsService } from '~shared/selectors/services/property-options.service';
import { AutoUnsub } from '~utils';
import { Typename } from 'showsourcing-api-lib';


export function filterTypeToTypename(type: FilterType): Typename {
	switch (type) {
		case FilterType.ASSIGNEE:
		case FilterType.CREATED_BY:
			return 'TeamUser';
		case FilterType.CATEGORY:
		case FilterType.CATEGORIES:
			return 'PropertyOption';
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
		PropertyOptionsService,
		ListHelper2Service,
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
		private propertyOptionSrv: PropertyOptionsService,
		private listHelper: ListHelper2Service,
	) {
		super();
	}

	ngOnInit(): void {
		this.filterSrv.setup([], ['value']);
		this.typename = filterTypeToTypename(this.type);

		if (this.typename === 'PropertyOption') {
			this.propertyOptionSrv.setup(this.type as any);
			this.choices$ = this.propertyOptionSrv.data$;
		} else {
			this.listHelper.setup(this.typename);
			this.choices$ = this.listHelper.data$;
		}
	}

	loadMore() {
		this.listHelper.loadMore();
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
				return `${choice.user.firstName} ${choice.user.lastName}`;
			case FilterType.EVENT:
			case FilterType.EVENTS:
				return `${choice.description.name}`;
			case FilterType.CATEGORY:
				return choice.value;
			default:
				return choice.name;
		}
	}

}
