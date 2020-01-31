import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
	AfterViewInit,
	ChangeDetectorRef,
	ElementRef,
	EventEmitter,
	HostListener,
	Input,
	OnInit,
	Output,
	QueryList,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import { ERM } from '~core/models';
import { FilterList } from '~shared/filters';
import { AbstractInput } from '~shared/inputs';

import { SelectorConfig, SelectorCustomConfig, SelectorsService } from '../services/selectors.service';
import { AbstractSelectorHighlightableComponent } from '../utils/abstract-selector-highlightable.component';
import { SelectorContentComponent } from './selector-content/selector-content.component';

export abstract class AbstractSelectorComponent extends AbstractInput implements OnInit, AfterViewInit {

	@Input() value: any | any[];
	@Input() multiple = false;
	@Input() canCreate = false;
	@Input() initialSeachTxt = '';
	@Input() filterList = new FilterList([]);
	abstract config: SelectorConfig | SelectorCustomConfig; // create type

	@Output() update = new EventEmitter<any>();
	@Output() close = new EventEmitter<null>();

	// for some reason it doesnt work without the id string
	@ViewChildren('abstract') virtualItems: QueryList<AbstractSelectorHighlightableComponent>;
	/** Exact same list but with elementRef type so it can be scrolles */
	@ViewChildren('abstract', { read: ElementRef }) elementRefItems: QueryList<ElementRef>;
	/** cdk virtual scroll viewport so we can determine the scroll index in combination with cdk a11y */
	@ViewChild(CdkVirtualScrollViewport, { static: false }) cdkVirtualScrollViewport: CdkVirtualScrollViewport;
	@ViewChild(SelectorContentComponent, { static: false }) selectorInput: SelectorContentComponent;

	// this closes the selector without closing dialogs, etc
	@HostListener('keydown.escape', ['$event'])
	onKeydownEsc(event) {
		event.stopPropagation();
		this.close.emit();
	}

	erm = ERM;

	constructor(protected selectorSrv: SelectorsService, protected cd: ChangeDetectorRef) { super(cd); }

	ngOnInit() {
		if (this.multiple && !this.value)
			this.value = [];
		this.setup();
	}

	ngAfterViewInit() {
		// init key manager on service
		this.selectorSrv.keyManager = new ActiveDescendantKeyManager(this.virtualItems).withWrap().withTypeAhead();
		if (this.initialSeachTxt)
			this.selectorSrv.search(this.initialSeachTxt);
	}

	// ARRAYS START AT 1 AND NOT 0, now that I have your attention, this abstract functions are declared in order to specify
	// which properties are we going to update, filter, store. Since most of the time we are working with entities, not all of the
	// time we want to return the update vlaue as an entity. e.g. Country, we display the items as entity, but what we update is a string.

	// WHEN WE SPEAK ABOUT 'STORED' ITEMS it means that are the items displayed in the value when we are multiple
	abstract setup(): void;
	/** returns the items that have been selected, with only the attributes that each item needs in order to be updated  */
	abstract updateMultipleFn(): any[];
	/** returns the item that has been selected with only the attributed needed for the udpate */
	abstract updateSingleFn(): any;
	/** returns an item if the item has been created sucessfully, otherwise undefined */
	abstract createFn(): any;
	/** true if the item is already stored, false otherwise */
	abstract isStoredFn(item): boolean;
	/** true if the string matches with any stored item, false otherwise */
	abstract areStoredMatchesNameFn(name): boolean;
	/** given an item returns the stored items without this item */
	abstract deleteStoredItemFn(item): any[];
	/** true if the item is not stored, false otherwise */
	abstract itemNotStoredFn(item: any): boolean;
	/** query that will be used to search the list items */
	abstract searchQuery: (text: string) => string;
	/** given an array of item and a name, return the items that matches the name  */
	abstract itemsMatchesName: (items: any[], name: string) => any[];

	onChange() {
		this.selectorSrv.value = this.value;
		this.multiple ? this.updateMultiple() : this.updateSingle();
	}

	updateSingle() {
		const item = this.updateSingleFn();
		if (item)
			this.update.emit(item);
		this.close.emit();
	}

	updateMultiple() {
		const trimedValues = this.updateMultipleFn();
		this.update.emit(trimedValues);
		this.selectorSrv.refetch().subscribe();
	}

	create() {
		const item = this.createFn();

		if (this.multiple && item)
			this.value.push(item);
		else if (!this.multiple && item)
			this.value = item;

		this.onChange();
		this.selectorSrv.refetch().subscribe();
		this.resetInput();
	}

	/** resets the input */
	resetInput() {
		if (!this.selectorInput)
			throw Error('input could not be reset');
		this.selectorInput.onResetInput();
	}

	// say its deault, example value: string but items are entity (country, harbour, etc)
	/**
	 * when the selector has multiple choice, we call this function to filter choices
	 * so the elements inside the value (array), does not appear on the choices
	 * @param items
	 */
	itemsNotStored = (items: any[]) => {
		if (!this.multiple)
			return items;

		return items.filter(item => this.itemNotStoredFn(item));
	}

	// say its deault, example value: string but items are entity (country, harbour, etc)
	areStoredMatchesName = (name: string) => {
		let matchesName = false;
		if (!this.multiple)
			return matchesName;
		if (this.value && this.value.length) {
			matchesName = this.areStoredMatchesNameFn(name);
		}
		return matchesName;
	}


	deleteStoredItem(item) {
		this.value = this.deleteStoredItemFn(item);
		this.onChange();
	}

	onSelect(item) {
		if (this.multiple && !this.isStored(item)) {
			this.value.push(item);
			this.onChange();
		} else if (!this.multiple) {
			this.value = item;
			this.onChange();
		}

		this.resetInput();
	}

	protected isStored(item) {
		let isSelected = false;
		if (!this.multiple)
			return isSelected;
		if (this.value && this.value.length) {
			isSelected = this.isStoredFn(item);
		}
		return isSelected;
	}

	/**
 * handles how we manage the selection of choices using keyboard events and keymanager
 * @param event keyboard event
 */
	onKeydown(event: KeyboardEvent) {
		if (event.keyCode === ENTER && this.selectorSrv.keyManager && this.selectorSrv.keyManager.activeItem) {
			// we get the item label from each row selector
			const label = this.selectorSrv.keyManager.activeItem.getLabel();
			const item = this.selectorSrv.keyManager.activeItem.getItem();
			if (label === 'create-button') {
				this.create();
			} else if (this.multiple) {
				// this is made since sometimes the user types faster, this way we assure that the label he types has to be the same
				// if he moves with the arrow keys, then we don't care about the typing field
				if ((label === this.selectorSrv.searchText) || this.selectorSrv.movedArrow) {
					this.onSelect(item);
				}
			} else {
				this.onSelect(item);
			}

		} else if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
			// we use this number to know between how many rows navigated we have to scroll Into view
			// we set it to 5 since its the number of elements we see on the selector.
			const numberRows = 5;
			this.selectorSrv.movedArrow = true;
			// active index
			let aIndex = this.selectorSrv.keyManager.activeItemIndex;
			const items = this.elementRefItems.toArray();
			// we call this before the event key since we are going back with the arrow key up
			// this case happens when you have pressed 5 times DOWN_ARROW and you get scrollIntoView
			// then you press UP_ARROW, instead of scrolling into the active index, we have to scroll to the index 5 rows above
			// this way we generate the ilusion that we went up on the row sections (try it on app for more clarification)
			if (event.keyCode === UP_ARROW && aIndex % numberRows === 0)
				items[aIndex - numberRows > 0 ? aIndex - numberRows : 0].nativeElement.scrollIntoView();
			// register the move of the key
			this.selectorSrv.keyManager.onKeydown(event);
			// get the new index
			aIndex = this.selectorSrv.keyManager.activeItemIndex;
			// this case scenario is when you reach the last index of the item when going with up arrow key, we have to scroll to the last item
			if (event.keyCode === UP_ARROW && aIndex === items.length - 1)
				items[aIndex].nativeElement.scrollIntoView();
			// every numberRows we scroll to the next item
			if (event.keyCode === DOWN_ARROW && aIndex % numberRows === 0)
				items[aIndex].nativeElement.scrollIntoView();
		}
	}
}
