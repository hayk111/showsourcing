import {
	Component, OnInit, ChangeDetectionStrategy,
	ElementRef, Renderer2, ViewChild,
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

	@Output() itemDisplayed = new EventEmitter<null>();

	/** The item is selected. */
	selected = false;

	@ViewChild(SearchAutocompleteItemContentComponent) content: SearchAutocompleteItemContentComponent;

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
		console.log('>> displayItem - content = ', this.content);
		if (this.content) {
			this.content.displayItem();
			this.itemDisplayed.emit();
		}
	}
}
