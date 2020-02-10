import {
	AfterContentInit,
	ChangeDetectionStrategy,
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	OnInit,
	Output,
	Renderer2,
	ViewChild,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import {
	SearchAutocompleteItemContentComponent,
} from '~shared/search-autocomplete/components/search-autocomplete-item-content/search-autocomplete-item-content.component';
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
	@Output() itemSelected = new EventEmitter<any>();

	/** The item is selected. */
	selected = false;

	@ContentChild(SearchAutocompleteItemContentComponent, { static: true }) content: SearchAutocompleteItemContentComponent;
	@ContentChild(SearchAutocompleteItemContentComponent, { read: ElementRef, static: false }) contentItem: ElementRef;

	constructor(private element: ElementRef, private renderer: Renderer2) {
		super();
	}

	ngOnInit() {
	}

	ngAfterContentInit() {
		if (this.content) {
			this.content.itemDisplayed.pipe(
				takeUntil(this._destroy$)
			).subscribe(() => {
				this.itemDisplayed.emit();
			});
		}
	}

	selectItem() {
		this.selected = true;
		this.renderer.addClass(this.element.nativeElement, 'selected');
		this.element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
		this.itemSelected.emit(this.element);
	}

	unselectItem() {
		this.selected = false;
		this.renderer.removeClass(this.element.nativeElement, 'selected');
	}

	displayItem(forceDisplay = false) {
		if (this.content) {
			this.content.displayItem();
			this.itemDisplayed.emit();
		}

		if (forceDisplay && this.contentItem) {
			// click is being triggered on the child node here because the content is undefined
			this.contentItem.nativeElement.children[0].click();
		}
	}
}
