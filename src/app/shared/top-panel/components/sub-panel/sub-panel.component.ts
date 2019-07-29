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
	/** whether we should display the filter icon */
	@Input() hasFilter = true;
	// whether the screen can be switched from table to list view
	@Input() hasSwitch = true;
	// content of the switch
	@Input() switchContent: ['list', 'kanban' | 'thumbs'] = ['list', 'thumbs'];
	// whether the screen has a search input
	@Input() hasSearch = true;

	@Input() title: string;

	// view that can be switched into
	@Input() view: 'list' | 'card';

	// whether the filters tab is opened
	@Input() filtersPanelOpened = false;

	/** what appears in the button on the right for adding an entity */
	@Input() buttonName: string;
	/** number of filters set */
	@Input() filtersAmount: number;

	@Input() searchValue: string;

	// when said view changes
	@Output() viewChange = new EventEmitter<string>();
	/** show filter panel */
	@Output() showFilters = new EventEmitter<undefined>();
	/** hide filter panel */
	@Output() hideFilters = new EventEmitter<undefined>();
	/** when said button is clicked */
	@Output() buttonClick = new EventEmitter<any>();
	// when the filter button is clicked
	@Output() filterClick = new EventEmitter<null>();
	// search event
	@Output() search = new EventEmitter<string>();
	// smart search event
	@Output() smartSearch = new EventEmitter<string>();

	@ContentChild(SearchAutocompleteComponent, { static: true }) searchAutocomplete: SearchAutocompleteComponent;

	private search$ = new Subject<string>();

	searchControl: FormControl;
	inputFocus = false;

	constructor(private element: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) {
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

}
