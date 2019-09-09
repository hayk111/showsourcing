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

@Component({
	selector: 'sub-panel-app',
	templateUrl: './sub-panel.component.html',
	styleUrls: ['./sub-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubPanelComponent extends AutoUnsub implements OnInit {
	isArchivedShown = false;
	archiveChecked = false;
	isCompletedTaskChecked = false;
	isTaskCreatedByMeOnlyChecked = false;
	isAssigned = false;
	/** whether we should display the filter icon */
	@Input() hasFilter = true;
	// whether the screen can be switched from table to list view
	@Input() hasSwitch = true;
	@Input() hasThumb = true;
	// whether we should display show archived checkbox
	@Input() hasArchived = true;
	// whether we should display assigned to me checkbox
	@Input() hasAssigned = true;
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

	@Input() title: string;
	@Input() count = 0;
	@Input() entityType: 'products' | 'suppliers' | 'samples'; // should be filled with all the entity types

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

	constructor(private element: ElementRef,
							private renderer: Renderer2,
							private cdr: ChangeDetectorRef) {
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

	toggleArchived() {
		this.isArchivedShown = !this.isArchivedShown;
		this.archivedChange();
	}

	toggleAssigned() {
		this.isAssigned = !this.isAssigned;
		this.assignedChange();
	}

	toggleCreatedTaskOnly() {
		this.isTaskCreatedByMeOnlyChecked = !this.isTaskCreatedByMeOnlyChecked;
		this.tasksOnlyChanged();
	}

	toggleCompletedTask() {
		this.isCompletedTaskChecked = !this.isCompletedTaskChecked;
		this.tasksCompletedChanged();
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
