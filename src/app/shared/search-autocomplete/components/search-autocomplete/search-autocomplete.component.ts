import {
	Component, OnInit, ChangeDetectionStrategy,
	Input, ViewChild, TemplateRef,
	ComponentFactoryResolver, ChangeDetectorRef,
	ContentChildren, QueryList,
	HostListener, AfterContentInit,
	Output, EventEmitter
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchAutocompleteItemComponent } from '../search-autocomplete-item/search-autocomplete-item.component';
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
export class SearchAutocompleteComponent extends AutoUnsub implements AfterContentInit {
	/** Position of the autocomplete in the X axis.*/
	@Input() xPosition = 16;
	/** Position of the autocomplete in the Y axis. */
	@Input() yPosition = 16;
	/** Width of the autocomplete. */
	@Input() width: number;
	@Input() closeOnDisplay = false;
	@Output() close = new EventEmitter<null>();
	@ContentChildren(SearchAutocompleteItemComponent) items: QueryList<SearchAutocompleteItemComponent>;

	autocompleteOpen = false;
	selectedItemIndex = 0;

	_destroyItems$ = new Subject<void>();

	constructor(private cdr: ChangeDetectorRef) {
		super();
	}

	ngAfterContentInit() {
		if (this.items) {
			this.items.changes.pipe(
				takeUntil(this._destroy$)
			).subscribe((values) => {
				this._destroyItems$.next();
				if (values && values.length > 0) {
					this.selectedItemIndex = 0;
					this.refreshItems();
					this.registerListenersForItems(values);
				} else {
					this.selectedItemIndex = 0;
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
		this.cdr.detectChanges();
	}

	/** Closes the autocomplete. */
	closeAutocomplete(): void {
		this.autocompleteOpen = false;
		this.close.emit();
	}

	@HostListener('document:keydown.arrowup', ['$event'])
	onKeyArrowUp(event) {
		if (this.autocompleteOpen) {
			this.updateItemIndex('up');
			this.refreshItems();
			event.stopPropagation();
		}
	}

	@HostListener('document:keydown.arrowdown', ['$event'])
	onKeyArrowDown(event) {
		if (this.autocompleteOpen) {
			this.updateItemIndex('down');
			this.refreshItems();
			event.stopPropagation();
		}
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
			if (this.selectedItemIndex < this.items.length - 1) {
				this.selectedItemIndex++;
			}
		} else {
			if (this.selectedItemIndex !== null && this.selectedItemIndex > 0) {
					this.selectedItemIndex--;
			}
		}
	}

	refreshItems() {
		this.items.forEach((item, index) => {
			if (index === this.selectedItemIndex) {
				item.selectItem();
			} else {
				item.unselectItem();
			}
		});
	}

	registerListenersForItems(values) {
		if (this.closeOnDisplay) {
			values.forEach(value => {
				value.itemDisplayed.pipe(
					takeUntil(this._destroyItems$),
				).subscribe(() => {
					this.closeAutocomplete();
				});
			});
		}
	}
}
