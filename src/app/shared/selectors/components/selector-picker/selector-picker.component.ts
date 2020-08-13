import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
	AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener,
	Input, OnChanges, OnInit, Output, QueryList, ViewChild, ViewChildren, OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, Subscription, of, BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap, tap, debounce, debounceTime, first } from 'rxjs/operators';
import { ERM } from '~core/erm';
import { FilterService, FilterType } from '~core/filters';
import { ListHelper2Service } from '~core/list-page2/list-helper-2.service';
import { FilterList } from '~shared/filters/models/filter-list.class';
import { AbstractInput, InputDirective } from '~shared/inputs';
import { PropertyOptionsService } from '~shared/selectors/services/property-options.service';
import { SelectorsService } from '~shared/selectors/services/selectors.service';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlightable.component';
import { ID, uuid } from '~utils';
import { Typename, api } from 'showsourcing-api-lib';

@Component({
	selector: 'selector-picker-app',
	templateUrl: './selector-picker.component.html',
	styleUrls: ['./selector-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListHelper2Service,
		PropertyOptionsService,
		SelectorsService,
		FilterService
	]
})
export class SelectorPickerComponent extends AbstractInput implements OnInit, AfterViewInit, OnChanges, OnDestroy {
	@Input() typename: Typename;
	@Input() customType: Typename;
	@Input() multiple = false;
	@Input() canCreate = false;
	@Input() filterList = new FilterList([]);
	// this is for entities with tags
	@Input() entityId: string;
	/**
	 * this is used when we have a selector that uses Selector Elements, so we can know which selectors elements
	 * we need to query
	 */
	@Input() definitionReference: ID;
	// sometimes we want to start with something to search already
	@Input() searchTxt = '';

	@Output() update = new EventEmitter<any>();
	@Output() close = new EventEmitter<null>();

	// this closes the selector without closing dialogs, etc
	@HostListener('keydown.escape', ['$event'])
	onKeydownEsc(event) {
		event.stopPropagation();
		this.close.emit();
	}

	/** choices to iterate */
	choices$: Observable<any[]>;
	choices: any[];
	_choicesSub: Subscription;

	_valueUpdated$ = new BehaviorSubject(null);

	/**
	 * items inside the virtual scroll that are needed for the cdk a11y selection with arrow keys
	 * each row on the virtual scroll has to implement the AbstractSelectorHighlightableComponent,
	 * since they keyManager needs it to update state of selection
	*/
	// for some reason it doesnt work without the id string
	@ViewChildren('abstract') virtualItems: QueryList<AbstractSelectorHighlightableComponent>;
	/** Exact same list but with elementRef type so it can be scrolles */
	@ViewChildren('abstract', { read: ElementRef }) elementRefItems: QueryList<ElementRef>;
	/** cdk virtual scroll viewport so we can determine the scroll index in combination with cdk a11y */
	@ViewChild(CdkVirtualScrollViewport, { static: false }) cdkVirtualScrollViewport: CdkVirtualScrollViewport;

	@ViewChild(InputDirective, { static: true }) inp: InputDirective;
	group: FormGroup;

	/** key manager that controlls the selection with arrowkeys  */
	keyManager: ActiveDescendantKeyManager<AbstractSelectorHighlightableComponent>;
	/** index when using manager keys and virtual scrolling */
	count = 0;
	searched$: Subject<string> = new Subject();

	/** whether the search has a exact match or not to display the create button */
	nameExists$ = new BehaviorSubject(false);

	// this helps the condition of fast typing only apply when typing and pressing Enter (OnKeyDown function)
	movedArrow = false;

	erm = ERM;

	// subject to call when the component is destroyed
	_destroy$ = new Subject<void>();

	constructor(
		public selectorSrv: SelectorsService,
		private listHelper: ListHelper2Service,
		private propertyOptionSrv: PropertyOptionsService,
		private filterSrv: FilterService,
		protected cd: ChangeDetectorRef,
		private fb: FormBuilder
	) { super(cd); }

	ngOnInit() {
		this.group = this.fb.group({
			name: ['']
		});

		if (this.typename === 'PropertyOption' || this.isTagElement()) {
			this.filterSrv.setup([], ['value']);
			this.propertyOptionSrv.setup(
				this.typename === 'PropertyOption' ? this.customType : 'TAG',
				this._destroy$
			);
			this.choices$ = this.propertyOptionSrv.data$
				.pipe(
					tap(choices => {
						this.choices = this.filterChoices(choices);
					}),
				);
		} else {
			this.filterSrv.setup([], ['name']);
			this.listHelper.setup(this.typename, this._destroy$);
			this.choices$ = combineLatest(this.listHelper.data$, this._valueUpdated$)
				.pipe(tap(([choices, _]) => {
					this.choices = this.filterChoices(choices);
				}));
		}

		this._choicesSub = this.choices$.subscribe();

		if (this.canCreate) {
			this.searched$.pipe(
				debounceTime(400),
				map(_ => this.checkExist(this.choices)),
				map(items => {
					return (!!items.length || !this.searchTxt || this.hasName(this.searchTxt));
				}),
				tap((exists: boolean) => this.nameExists$.next(exists))
			).subscribe();
		}

		// this.initializeChoices();

		// if there is any search text available when we start the component, we search for it
		if (this.searchTxt)
			this.search(this.searchTxt);
	}

	ngAfterViewInit() {
		this.keyManager = new ActiveDescendantKeyManager(this.virtualItems).withWrap().withTypeAhead();
		this.inp.focus();
		this.search(this.searchTxt);
	}

	ngOnChanges() {
		if (this.choices$ && this.multiple) {
			// if its multiple we want to filter the values that we have currently selected, so they don't appear on the options
			this.choices$.pipe(map((items) => this.filterValues(items)));
		}
	}

	get placeholderTypeName(): string {
		return this.typename === 'PropertyOption' ? this.customType.toUpperCase() : this.typename.toUpperCase();
	}

	/**
	 * when the selector has multiple choice, we call this function to filter choices
	 * so the elements inside the value (array), does not appear on the choices
	 * @param items
	 */
	private filterValues(items: any[]) {
		return items.filter(i =>
			// if the array exists we check that the item does not exist on the value array
			(this.value) ? !((this.value).some(val => val.id === i.id)) : true);
	}

	/**
	 * resets input, focus input and reset search
	 */
	private resetInput() {
		this.inp.control.reset();
		this.inp.focus();
	}

	/**
	 * search a text and set first item active on selector
	 * @param text
	 */
	search(text, setFirstItemActive = true) {
		this.searchTxt = text.trim();
		this.movedArrow = false;
		this.filterSrv.search(this.searchTxt);
		this.searched$.next(this.searchTxt);
	}

	/**
	 * this is called when we want to update the value
	 */
	onChange() {
		this.onChangeFn(this.value);
		if (!this.multiple) {
			this.updateSingle();
		} else {
			this.updateMultiple();
		}
	}

	/**
	 * Emits an array of new values so they can be updated and refetch the selector
	 */
	private updateMultiple() {
		let trimValues;
		switch (this.typename) {
			case 'Product':
				trimValues = this.value.map(v => (
					{
						id: v.id,
						name: v.name,
						images: v.images ? v.images : null,
						supplier: v.supplier ? v.supplier : null,
						__typename: v.__typename
					}
					));
					break;
			case 'ProductTag':
				const entityType = this.typename.slice(0, this.typename.toLowerCase().indexOf('tag')).toLowerCase();
				trimValues = this.value.map(value => {
					return {
						id: this.entityId + ':' + value.id,
						tagId: value.id,
						[entityType + 'Id']: this.entityId,
					};
				});
				break;
			default:
				trimValues = this.value.map(v => ({ id: v.id, name: v.name, __typename: v.__typename }));
				break;
		}

		if (this.isTagElement()) {
			this.selectorSrv.create(this.typename as any, trimValues[trimValues.length - 1])
				.pipe(first())
				.subscribe();
		} else {
			this.update.emit(trimValues);
		}
	}

	/**
	 * Emits the new single value so it can be updated
	 */
	private updateSingle() {
		const type = this.typename === 'PropertyOption' ? this.value.type : this.value.__typename;
		const updateData = {
			[type.toLowerCase() + 'Id']: this.typename === 'TeamUser' ? this.value.user.id : this.value.id,
		};
		this.update.emit(updateData);
		this.close.emit();
	}

	/**
	 * Upon selecting an item, we read a property, depending on the type, and we emit its new value and reset the input, d
	 * @param item selected item, which will be the new value
	 */
	onSelect(item) {
		let itemToReturn = item;
		itemToReturn.__typename = this.typename === 'PropertyOption' ? this.customType : this.typename;

		switch (this.typename) {
			case 'Constant':
				itemToReturn = item.name;
				break;
			default:
				itemToReturn = item;
				break;
		}

		if (this.multiple && !this.isStored(itemToReturn)) {
			if (this.value && Array.isArray(this.value)) {
				this.value.push(itemToReturn);
			} else {
				this.value = [itemToReturn];
			}
			this.onChange();
		} else if (!this.multiple) { // if not multiple we update and close
			this.value = itemToReturn;
			this.onChange();
		}
		this._valueUpdated$.next(null);
		this.resetInput();
	}

	/**
	 * checks if any of items match with the current searchText
	 * @param items items to check if they match with current searchText
	 * @returns list of items that match the current searchTxt
	 */
	private checkExist(items: any[]) {
		return items.filter(it => it.name === this.searchTxt || it.value === this.searchTxt);
	}

	/**
	 * Creates a new entity if its a supported type
	 */
	create() {
		let createObs$: Observable<any>;
		let added: any;
		const value = this.searchTxt;
		if (value && this.typename) {
			if (this.isTagElement()) {
				const entityType = this.typename.slice(0, this.typename.toLowerCase().indexOf('tag')).toLowerCase();
				added = {
					[entityType + 'Id']: this.entityId,
				};
				createObs$ = this.propertyOptionSrv.createPropertyOptions([{type: 'TAG', value}])
					.pipe(
						switchMap((createdTags: any[]) => {
							added.tagId = createdTags[0] ? createdTags[0].id : undefined;
							return this.selectorSrv.create(this.typename as any, added);
						}),
						first()
					);
			} else {
				added = this.typename === 'PropertyOption' ?
									{ value, type: this.customType } :
									{ name: value, __typename: this.typename };
				createObs$ = this.typename === 'PropertyOption' 															 ?
				this.propertyOptionSrv.createPropertyOptions([{type: this.customType, value}]) :
				this.selectorSrv.create(this.typename as any, added);
			}

			if (this.multiple) {
				if (this.value && this.value.length) {
					this.value.push(added);
				} else {
					this.value = [added];
				}
			} else {
				this.value = added;
			}

			// debugger; // to check value - if it has added item id and typename

			if (createObs$ === undefined) {
				return;
			}

			// we are using take 1 in srv, no need for fancy destroying
			createObs$.subscribe((created) => {
				this.nameExists$.next(true);
				// we add it directly to the value
				if (this.multiple) {
					// take the last element that we pushed into this.value and set it's id
					this.value[this.value.length - 1].id = created[0].id;
				} else {
					this.value.id = created[0].id;
				}

				this._valueUpdated$.next(null);
				this.onChange();
				this.resetInput();
			});
		}
	}

	/**
	 * handles how we manage the selection of choices using keyboard events and keymanager
	 * @param event keyboard event
	 */
	onKeydown(event: KeyboardEvent) {
		if (event.keyCode === ENTER && this.keyManager && this.keyManager.activeItem) {
			// we get the item label from each row selector
			const label = this.keyManager.activeItem.getLabel();
			const item = this.keyManager.activeItem.getItem();
			if (label === 'create-button') {
				this.create();
			} else if (this.multiple) {
				// this is made since sometimes the user types faster, this way we assure that the label he types has to be the same
				// if he moves with the arrow keys, then we don't care about the typing field
				if ((label === this.searchTxt) || this.movedArrow) {
					this.onSelect(item);
				}
			} else {
				this.onSelect(item);
			}

		} else if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
			// we use this number to know between how many rows navigated we have to scroll Into view
			// we set it to 5 since its the number of elements we see on the selector.
			const numberRows = 5;
			this.movedArrow = true;
			// active index
			let aIndex = this.keyManager.activeItemIndex;
			const items = this.elementRefItems.toArray();
			// we call this before the event key since we are going back with the arrow key up
			// this case happens when you have pressed 5 times DOWN_ARROW and you get scrollIntoView
			// then you press UP_ARROW, instead of scrolling into the active index, we have to scroll to the index 5 rows above
			// this way we generate the ilusion that we went up on the row sections (try it on app for more clarification)
			if (event.keyCode === UP_ARROW && aIndex % numberRows === 0)
				items[aIndex - numberRows > 0 ? aIndex - numberRows : 0].nativeElement.scrollIntoView();
			// register the move of the key
			this.keyManager.onKeydown(event);
			// get the new index
			aIndex = this.keyManager.activeItemIndex;
			// this case scenario is when you reach the last index of the item when going with up arrow key, we have to scroll to the last item
			if (event.keyCode === UP_ARROW && aIndex === items.length - 1)
				items[aIndex].nativeElement.scrollIntoView();
			// every numberRows we scroll to the next item
			if (event.keyCode === DOWN_ARROW && aIndex % numberRows === 0)
				items[aIndex].nativeElement.scrollIntoView();
		}
	}


	/**
	 * checks if the item matches with any of the values stored
	 * @param item
	 * @returns true if the current item is selected, flase otherwise
	 */
	// this method should only be used when multiple true, since we acces the value as an array
	private isStored(item: any) {
		let isSelected = false;
		if (!this.multiple)
			return isSelected;
		if (this.value && this.value.length) {
			isSelected = !!this.value.find(value => value.id === item.id);
		}
		return isSelected;
	}

	capitalizeFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	/**
	 * checks if the name given matches with any of the values stored
	 * @param name
	 */
	// this method should only be used when multiple true, since we acces the value as an array
	private hasName(name: string) {
		let hasName = false;
		if (!this.multiple) {
			return hasName;
		}
		if (this.value && this.value.length) {
			hasName = !!this.value.find(value => value.name && value.name.toLowerCase() === name);
		}
		return hasName;
	}

	// this is only called when deleting from the current-values-container,
	// should only be used when multiple true
	/**
	 * deletes the item from the array of current values
	 * @param item item
	 */
	delete(item) {
		this.value = this.value.filter(value => value.id !== item.id);
		this.onChange();
	}

	private isTagElement() {
		return this.typename.toLowerCase().includes('tag');
	}


	/**
	 * filters choices so they're not in the current "value"
	 * @param  {any[]} choices
	 */
	filterChoices(choices: any[]): any[] {
		const result =  choices.filter(choice => {

			if (Array.isArray(this.value)) {
				if (this.value && this.value.length && this.value.some(val => val?.id === choice?.id)) {
					return false;
				}
			} else if (typeof this.value === 'object') {
				return choice?.id !== this.value?.id;
			}

			return true;
		});

		return result;
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
		this._choicesSub.unsubscribe();
	}
}
