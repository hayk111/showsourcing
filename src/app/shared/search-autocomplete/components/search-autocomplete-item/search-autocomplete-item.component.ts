import {
	Component, OnInit, ChangeDetectionStrategy,
	ElementRef, Renderer2, ContentChild,
	Output, EventEmitter
} from '@angular/core';
import { SearchAutocompleteItemContentComponent } from '../search-autocomplete-item-content/search-autocomplete-item-content.component';

@Component({
	selector: 'search-autocomplete-item-app',
	templateUrl: './search-autocomplete-item.component.html',
	styleUrls: ['./search-autocomplete-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex pointer'
	}
})
export class SearchAutocompleteItemComponent implements OnInit {

	/** The corresponding item was displayed. */
	@Output() itemDisplayed = new EventEmitter<null>();

	/** The item is selected. */
	selected = false;

	@ContentChild(SearchAutocompleteItemContentComponent) content: SearchAutocompleteItemContentComponent;

	constructor(private element: ElementRef, private renderer: Renderer2) { }

	ngOnInit() {
	}

	selectItem() {
		this.selected = true;
		this.renderer.addClass(this.element.nativeElement, 'selected');
	}

	unselectItem() {
		this.selected = false;
		this.renderer.removeClass(this.element.nativeElement, 'selected');
	}

	displayItem() {
		if (this.content) {
			this.content.displayItem();
			this.itemDisplayed.emit();
		}
	}
}
