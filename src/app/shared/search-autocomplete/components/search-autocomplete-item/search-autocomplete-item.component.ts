import {
	Component, OnInit, ChangeDetectionStrategy,
	ElementRef, Renderer2
} from '@angular/core';

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

	/** The item is selected. */
	selected = false;

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
}
