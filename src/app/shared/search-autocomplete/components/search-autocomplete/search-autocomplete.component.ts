import {
	Component, OnInit, ChangeDetectionStrategy,
	Input, ViewChild, TemplateRef,
	ComponentFactoryResolver, ChangeDetectorRef,
	ContentChildren, QueryList,
	HostListener, AfterContentInit
} from '@angular/core';
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
	// changeDetection: ChangeDetectionStrategy.OnPush,
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
	@ContentChildren(SearchAutocompleteItemComponent) items: QueryList<SearchAutocompleteItemComponent>;

	autocompleteOpen = false;
	selectedItemIndex: number;

	constructor(private cdr: ChangeDetectorRef) {
		super();
	}

	ngAfterContentInit() {
		if (this.items) {
			this.items.changes.pipe(
				takeUntil(this._destroy$)
			).subscribe((values) => {
				if (values && values.length > 0) {
					this.selectedItemIndex = 0;
					this.refreshItems();
				} else {
					this.selectedItemIndex = null;
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
	}

	@HostListener('document:keydown.arrowup', ['$event'])
	onKeyArrowUp(event) {
		if (this.autocompleteOpen) {
			this.updateItemIndex('up');
			this.refreshItems();
		}
	}

	@HostListener('document:keydown.arrowdown', ['$event'])
	onKeyArrowDown(event) {
		if (this.autocompleteOpen) {
			this.updateItemIndex('down');
			this.refreshItems();
		}
	}

	@HostListener('document:keydown.enter', ['$event'])
	onKeyEnter(event) {
		if (this.autocompleteOpen) {
			console.log('enter');
		}
	}

	updateItemIndex(direction = 'down') {
		if (direction === 'down') {
			if (this.selectedItemIndex !== null) {
				if (this.selectedItemIndex < this.items.length - 1) {
					this.selectedItemIndex++;
				}
			} else {
				this.selectedItemIndex = 0;
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
}
