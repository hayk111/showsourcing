import {
	AfterContentInit,
	Component,
	ContentChildren,
	EventEmitter,
	HostListener,
	Input,
	Output,
	QueryList,
	Renderer2,
	OnInit,
	Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
	SearchAutocompleteItemComponent,
} from '~shared/search-autocomplete/components/search-autocomplete-item/search-autocomplete-item.component';
import { AutoUnsub } from '~utils';

export type AutocompletePositionX = 'before' | 'after';

export type AutocompletePositionY = 'above' | 'below';

/**
 * Opens a autocomplete when x is clicked
 */
@Component({
	selector: 'search-autocomplete-app',
	templateUrl: './search-autocomplete.component.html',
	styleUrls: ['./search-autocomplete.component.scss'],
	host: {
		'aria-haspopup': 'true',
	}
})
export class SearchAutocompleteComponent extends AutoUnsub implements OnInit, AfterContentInit {
	/** Position of the autocomplete in the X axis.*/
	@Input() xPosition = 16;
	/** Position of the autocomplete in the Y axis. */
	@Input() yPosition = 16;
	/** Width of the autocomplete. */
	@Input() width: number;
	@Input() closeOnDisplay = false;
	@Output() close = new EventEmitter<null>();
	/** When an item is selected */
	@Output() itemSelected = new EventEmitter<null>();
	/** When all items are unselected */
	@Output() allItemsUnselected = new EventEmitter<null>();
	@ContentChildren(SearchAutocompleteItemComponent) items: QueryList<SearchAutocompleteItemComponent>;

	autocompleteOpen = false;
	selectedItemIndex = 0;
	handler: any;

	_destroyItems$ = new Subject<void>();

	constructor(private renderer: Renderer2, @Inject(DOCUMENT) public document: Document) {
		super();
	}

	ngOnInit() {
		this.handler = this.renderer.listen(this.document, 'keydown', event => {
			if (event.code === 'ArrowDown') {
				if (this.autocompleteOpen) {
					this.updateItemIndex('down');
					this.refreshItems();
					event.preventDefault();
				}
				return;
			}

			if (event.code === 'ArrowUp') {
				if (this.autocompleteOpen) {
					this.updateItemIndex('up');
					this.refreshItems();
					event.preventDefault();
				}
				return;
			}
		});
	}

	ngAfterContentInit() {
		if (this.items) {
			this.items.changes.pipe(
				takeUntil(this._destroy$)
			).subscribe((values) => {
				this._destroyItems$.next();
				if (values && values.length > 0) {
					this.selectedItemIndex = -1;
					this.refreshItems();
				} else {
					this.selectedItemIndex = -1;
				}
			});
		}
	}

	/** Toggles the autocomplete between the open and closed states. */
	toggleAutocomplete(): void {
		return this.autocompleteOpen ? this.closeAutocomplete() : this.openAutocomplete();
	}

	/** Opens the autocomplete. */
	openAutocomplete(): void {
		this.autocompleteOpen = true;
	}

	/** Closes the autocomplete when clicking outside. */
	clickOutside() {
		this.closeAutocomplete();
	}

	/** Closes the autocomplete. */
	closeAutocomplete(): void {
		this.autocompleteOpen = false;
		this.close.emit();
	}

	@HostListener('document:keydown.enter', ['$event'])
	onKeyEnter(event) {
		if (this.autocompleteOpen) {
			const selectedItem = this.items.find((item, index) => (index === this.selectedItemIndex));
			if (selectedItem) {
				selectedItem.displayItem();
			}
		}
	}

	updateItemIndex(direction = 'down') {
		if (direction === 'down') {
			if (this.selectedItemIndex === -1) {
				this.selectedItemIndex = 0;
			} else if (this.selectedItemIndex < this.items.length - 1) {
				this.selectedItemIndex++;
			}
		} else {
			if (this.selectedItemIndex >= 0) {
				this.selectedItemIndex--;
			}
		}
	}

	refreshItems() {
		if (this.selectedItemIndex !== -1) {
			this.items.forEach((item, index) => {
				if (index === this.selectedItemIndex) {
					item.selectItem();
				} else {
					item.unselectItem();
				}
				this.itemSelected.emit();
			});
		} else {
			this.unselectAll();
			this.allItemsUnselected.emit();
		}
	}

	unselectAll() {
		this.items.forEach((item, index) => {
			item.unselectItem();
		});
	}

}
