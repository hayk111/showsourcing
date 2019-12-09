import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { EntityType, EntityTypeEnum } from '~models';
import { SearchAutocompleteComponent } from '~shared/search-autocomplete/components/search-autocomplete/search-autocomplete.component';
import { FilterList } from '~shared/filters';


export type Panel = 'search' | 'filters' | 'actions' | 'quick-filters' | 'view-switcher';
export type QuickFilter = 'archived' | 'assignee' | 'createdBy' | 'completed';
export type View = 'table' | 'cards' | 'kanban';

@Component({
	selector: 'controller-list-app',
	templateUrl: './controller-list.component.html',
	styleUrls: ['./controller-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flexBetween'
	}
})
export class ControllerListComponent {
	/** describes the layout of the controller-list */
	@Input() panels: Panel[]  = ['search', 'filters', 'actions', 'quick-filters', 'view-switcher'];
	/** the quick filters checkbox displayed */
	@Input() quickFilters: QuickFilter[] = ['archived', 'assignee'];
	/** the different panel the viewswitcher can switch into */
	@Input() switchContent: View[] = ['table', 'cards', 'kanban'];
	@Input() view: View = 'table';

	/** total number of entities */
	@Input() count = 0;
	/** erm to display entity related messages */
	@Input() entityType: EntityType;

	/** whether the filters tab is opened */
	@Input() filtersPanelOpened = false;
	/** number of filters set */
	@Input() filtersAmount: number;
	@Input() searchType: 'short' | 'long' = 'long';
	@Input() searchValue: string;

	// when the view from the switcher changes
	@Output() viewChange = new EventEmitter<string>();
	/** show filter panel */
	@Output() showFilters = new EventEmitter<undefined>();
	/** clear filters panel */
	@Output() clearFilters = new EventEmitter<undefined>();
	/** hide filter panel */
	@Output() hideFilters = new EventEmitter<undefined>();
	/** when said button is clicked */
	@Output() buttonClick = new EventEmitter<any>();
	// when the filter button is clicked
	@Output() filterClick = new EventEmitter<null>();

	/** show only the products assigned to the current user */
	@Output() showAssigned = new EventEmitter<undefined>();
	@Output() hideAssigned = new EventEmitter<undefined>();

	/** show only the products created by current user */
	@Output() showMyProducts = new EventEmitter<undefined>();
	/** hide the products created by current user */
	@Output() hideMyProducts = new EventEmitter<undefined>();
	/** show only the export files created by the current user */
	@Output() showMyExport = new EventEmitter<undefined>();
	@Output() hideMyExport = new EventEmitter<undefined>();

	@Output() showTasksCreatedByMeOnly = new EventEmitter<undefined>();
	@Output() hideTasksCreatedByMeOnly = new EventEmitter<undefined>();

	@Output() showTasksCompleted = new EventEmitter<undefined>();
	@Output() hideTasksCompleted = new EventEmitter<undefined>();

	@Output() export = new EventEmitter<undefined>();

	// search event
	@Output() search = new EventEmitter<string>();
	// smart search event
	@Output() smartSearch = new EventEmitter<string>();

	@ContentChild(SearchAutocompleteComponent, { static: true }) searchAutocomplete: SearchAutocompleteComponent;

	private search$ = new Subject<string>();

	searchControl: FormControl = new FormControl(this.searchValue);
	inputFocus = false;

	// TODO: we should use the filterList for this
	isAssignedToMeChecked = false;
	isCreatedByMeChecked = false;
	isArchivedChecked = false;
	isCompletedChecked = false;

	onFocusSearch(event) {
		if (this.searchAutocomplete) {
			this.searchAutocomplete.unselectAll();
		}
	}

	// todo we should use the filter list
	toggleCreatedByMe() {
		this.isCreatedByMeChecked = !this.isCreatedByMeChecked;
	}

	toggleArchived() {
		this.isArchivedChecked = !this.isArchivedChecked;
		this.archivedChange();
	}

	toggleAssignedToMe() {
		this.isAssignedToMeChecked = !this.isAssignedToMeChecked;
		this.assignedChange();
	}

	toggleMyExport() {
		this.isMyExport = !this.isMyExport;
		this.myExportChange();
	}

	toggleCreatedTaskOnly() {
		this.isTaskCreatedByMeOnlyChecked = !this.isTaskCreatedByMeOnlyChecked;
		this.tasksOnlyChanged();
	}

	toggleCompletedTask() {
		this.isCompletedTaskChecked = !this.isCompletedTaskChecked;
		this.tasksCompletedChanged();
	}

	private myProductsChanged() {
		if (this.isMyProductsShown) {
			this.showMyProducts.emit();
		} else {
			this.hideMyProducts.emit();
		}
	}

	archivedChange() {
		if (this.isArchivedShown) {
			this.showArchived.emit();
		} else {
			this.hideArchived.emit();
		}
	}

	assignedChange() {
		if (this.isAssigned) {
			this.showAssigned.emit();
		} else {
			this.hideAssigned.emit();
		}
	}

	private myExportChange() {
		if (this.isMyExport) {
			this.showMyExport.emit();
		} else {
			this.hideMyExport.emit();
		}
	}

	private tasksOnlyChanged() {
		if (this.isTaskCreatedByMeOnlyChecked) {
			this.showTasksCreatedByMeOnly.emit();
		} else {
			this.hideTasksCreatedByMeOnly.emit();
		}
	}

	private tasksCompletedChanged() {
		if (this.isCompletedTaskChecked) {
			this.showTasksCompleted.emit();
		} else {
			this.hideTasksCompleted.emit();
		}
	}

	checkEntityType(entity: any) {
		if (!Object.values(EntityTypeEnum).includes(entity)) {
			throw new Error('Entity type passed to the ControllerListComponent is of wrong type: ' + entity);
		}

		return entity;
	}
}
