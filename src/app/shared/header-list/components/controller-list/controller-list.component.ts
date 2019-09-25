import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	Renderer2,
	AfterViewInit,
	ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
	SearchAutocompleteComponent,
} from '~shared/search-autocomplete/components/search-autocomplete/search-autocomplete.component';
import { AutoUnsub } from '~utils';
import { ControllerListService } from '../../services/controller-list.service';

@Component({
	selector: 'controller-list-app',
	templateUrl: './controller-list.component.html',
	styleUrls: ['./controller-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ControllerListComponent extends AutoUnsub implements OnInit {
	/** whether we should display the filter icon */
	@Input() hasFilter = true;
	// whether the screen can be switched from table to list view
	@Input() hasSwitch = true;
	@Input() hasThumb = true;
	// whether we should display show archived checkbox
	@Input() hasArchived = true;
	// whether we should display assigned to me checkbox
	@Input() hasAssigned = true;
	// whether we should display my exports only checkbox
	@Input() hasMyExport = false;
	// whether we should display export button
	@Input() hasExport = true;
	// content of the switch
	@Input() switchContent: ['list-menu', 'board', 'kanban' | 'grid'] = ['list-menu', 'board', 'grid'];
	// whether the screen has a search input
	@Input() hasSearch = true;
	// whether we should display show completed checkbox
	@Input() hasCompletedTask = false;
	// whether we should display show tasks created by me checkbox
	@Input() hasTaskCreatedByMeOnly = false;

	// whether the subpanel is inside dialog
	@Input() subPanelDialog = false;

	@Input() searchFullWidth = true;

	@Input() title: string;
	@Input() count = 0;
	@Input() entityType: 'PRODUCT' | 'PROJECT' | 'SUPPLIER' | 'SAMPLE'; // should be filled with all the entity types

	// view that can be switched into
	@Input() view: 'list' | 'board' | 'card' = 'list';

	// whether the filters tab is opened
	@Input() filtersPanelOpened = false;

	/** what appears in the button on the right for adding an entity */
	@Input() buttonName: string;
	/** number of filters set */
	@Input() filtersAmount: number;

	@Input() searchType: 'short' | 'long' = 'long';
	@Input() searchValue: string;

	// when said view changes
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
	/** show archived products */
	@Output() showArchived = new EventEmitter<undefined>();
	/** hide archived products */
	@Output() hideArchived = new EventEmitter<undefined>();

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

	searchControl: FormControl;
	inputFocus = false;

	isArchivedShown = false;
	isMyProductsShown = false;
	isCompletedTaskChecked = false;
	isTaskCreatedByMeOnlyChecked = false;
	isAssigned = false;
	isMyExport = false;

	constructor(private element: ElementRef,
		private renderer: Renderer2,
		private cdr: ChangeDetectorRef,
		private controllerListService: ControllerListService) {
		super();
	}

	ngOnInit() {
		this.searchControl = new FormControl(this.searchValue);

		if (this.searchAutocomplete) {

			this.searchAutocomplete.itemSelected.pipe(
				takeUntil(this._destroy$)
			).subscribe(() => {
				this.inputFocus = false;
			});

			this.searchAutocomplete.allItemsUnselected.pipe(
				takeUntil(this._destroy$)
			).subscribe(() => {
				this.inputFocus = true;
			});
		}

		this.controllerListService.filtersClear.pipe(
			takeUntil(this._destroy$)
		).subscribe(() => {
			this.isArchivedShown = this.isAssigned = false;
		});
	}

	triggerSmartSearch(event) {
		const search = this.searchControl.value;
		this.smartSearch.emit(search);
		if (this.searchAutocomplete) {
			this.searchAutocomplete.openAutocomplete();
		}
	}

	onFocusSearch(event) {
		if (this.searchAutocomplete) {
			this.searchAutocomplete.unselectAll();
		}
	}

	toggleMyProducts() {
		this.isMyProductsShown = !this.isMyProductsShown;
		this.myProductsChanged();
	}

	toggleArchived() {
		this.isArchivedShown = !this.isArchivedShown;
		this.archivedChange();
	}

	toggleAssigned() {
		this.isAssigned = !this.isAssigned;
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

	private archivedChange() {
		if (this.isArchivedShown) {
			this.showArchived.emit();
		} else {
			this.hideArchived.emit();
		}
	}

	private assignedChange() {
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

}
