import {
	Component, OnInit, ChangeDetectionStrategy,
	ElementRef, Renderer2, ContentChild,
	Output, EventEmitter, AfterContentInit
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { SearchAutocompleteItemContentComponent } from '../search-autocomplete-item-content/search-autocomplete-item-content.component';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'search-autocomplete-item-app',
	templateUrl: './search-autocomplete-item.component.html',
	styleUrls: ['./search-autocomplete-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex pointer'
	}
})
export class SearchAutocompleteItemComponent extends AutoUnsub implements OnInit, AfterContentInit {

	/** The corresponding item was displayed. */
	@Output() itemDisplayed = new EventEmitter<null>();

	/** The item is selected. */
	selected = false;

	@ContentChild(SearchAutocompleteItemContentComponent) content: SearchAutocompleteItemContentComponent;

	constructor(private element: ElementRef, private renderer: Renderer2) {
		super();
	}

	ngOnInit() {
	}

	ngAfterContentInit() {
		this.content.itemDisplayed.pipe(
			takeUntil(this._destroy$)
		).subscribe(() => {
			this.itemDisplayed.emit();
		});
	}

	selectItem() {
		this.selected = true;
		this.renderer.addClass(this.element.nativeElement, 'selected');
		this.element.nativeElement.scrollIntoView();
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
