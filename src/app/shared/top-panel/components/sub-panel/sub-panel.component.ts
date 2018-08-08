import {
	ChangeDetectionStrategy, Component, EventEmitter,
	Input, Output, OnInit,
	ElementRef, Renderer2, ContentChild,
	ChangeDetectorRef, ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { SearchAutocompleteComponent } from '~shared/search-autocomplete/components/search-autocomplete/search-autocomplete.component';

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
	// whether the screen has a search input
	@Input() hasSearch = true;
	// whether the screen has a create button
	@Input() hasCreate = true;

	@Input() title: string;

	// view that can be switched into
	@Input() view: 'list' | 'card';

	/** what appears in the button on the right for adding an entity */
	@Input() buttonName: string;
	/** specify if the icon should be displayed or not for the adding button */
	@Input() buttonIcon = true;
	/** number of filters set */
	@Input() filters: number;

	// when said view changes
	@Output() viewChange = new EventEmitter<string>();
	/** show filter panel */
	@Output() showFilters = new EventEmitter<undefined>();
	/** when said button is clicked */
	@Output() buttonClick = new EventEmitter<any>();
	// when the filter button is clicked
	@Output() filterClick = new EventEmitter<null>();
	// search event
	@Output() search = new EventEmitter<string>();
	// smart search event
	@Output() smartSearch = new EventEmitter<string>();

	@ContentChild(SearchAutocompleteComponent) searchAutocomplete: SearchAutocompleteComponent;
	@ViewChild('inp') inputRef: ElementRef;

	private search$ = new Subject<string>();

	searchControl: FormControl;

	constructor(private element: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) {
		super();
		this.searchControl = new FormControl();
	}

	ngOnInit() {
		if (this.searchAutocomplete) {
			this.searchAutocomplete.close.pipe(
				takeUntil(this._destroy$)
			).subscribe(() => {
				this.searchControl.setValue('');
			});

			this.searchAutocomplete.itemSelected.pipe(
				takeUntil(this._destroy$)
			).subscribe(() => {
				this.inputRef.nativeElement.blur();
			});

			this.searchAutocomplete.allItemsUnselected.pipe(
				takeUntil(this._destroy$)
			).subscribe(() => {
				this.inputRef.nativeElement.focus();
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

	triggerSearch(event) {
		const search = this.searchControl.value;
		this.search.emit(search);
	}

	onBlurSearch(event) {
	}

	onFocusSearch(event) {
		if (this.searchAutocomplete) {
			this.searchAutocomplete.unselectAll();
		}
	}

}
