import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
	HostListener
} from '@angular/core';
import { debounceTime, tap } from 'rxjs/operators';
import { FilterList } from '~shared/filters/models/filter-list.class';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { TabFocusActionDirective } from '~shared/utils';
import { ID } from '~utils';
import { Typename } from '~core/erm3/typename.type';

@Component({
	selector: 'selector-app',
	templateUrl: './selector.component.html',
	styleUrls: ['./selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(SelectorComponent)]
})
export class SelectorComponent extends AbstractInput implements OnInit {

	@Input() value: any;

	// it could be String type, since selectors are used inside dynamic forms (customField.metadata.target)
	@Input() typename: Typename;
	@Input() customType: string;

	@Input() multiple = false;
	@Input() canCreate = false;
	@Input() hasPicker = true;
	@Input() filterList = new FilterList([]);
	@Input() width = 395;
	@Input() offsetX = 0;
	@Input() offsetY = 8;
	@Input() extraOffset = { offsetX: 0, offsetY: 30 };
	@Input() disabled = false;
	// we use it only if we have to initialize the selector with a search
	@Input() searchTxt = '';
	// wheter the selector opens to the most right side or the most left side
	@Input() leftSideOrientation = false;
	/**
	 * this is used when we have a selector that uses Selector Elements, so we can know which selectors elements
	 * we need to query
	 */
	@Input() definitionReference: ID;
	/**
	 * this is used e.g in the tags selectors, where to create a tag we need to provide entity ID
	 */
	@Input() entityId: string;

	@Output() menuClosed = new EventEmitter<any>();
	@Output() menuOpened = new EventEmitter<any>();
	@Output() update = new EventEmitter<any>();

	// some times we want to focus the focus directive on the content inside the selector
	@ContentChild(TabFocusActionDirective, { static: true }) tab: TabFocusActionDirective;

	menuOpen = false;
	menuPosition: { posX: string, posY: string } = { posX: '0px', posY: '0px' };

	// we need this in order to calculate dynamically the offsetX on preview badges
	constructor(public elem: ElementRef, private cdr: ChangeDetectorRef) { super(cdr); }

	ngOnInit() {
		// everytime we focus the content and hit enter, we are opening the menu
		if (this.tab) {
			let word = '';
			this.tab.typing.pipe(
				tap(key => {
					word += key;
				}),
				debounceTime(300),
			).subscribe(_ => {
				this.openMenu(null, true, word);
				word = '';
			});

			this.tab.keyEnter.subscribe(_ => this.openMenu());
		}
	}

	/** Toggles the menu between the open and closed states. */
	toggleMenu(): void {
		this.menuOpen ? this.closeMenu() : this.openMenu();
	}

	/** Opens the menu. */
	openMenu(event: any = null, calculateOffset = true, searchTxt?: string): void {
		if (!this.disabled && !this.readonly) {
			if (searchTxt) {
				this.searchTxt = searchTxt;
			}
			this.menuOpen = true;

			if (event && calculateOffset) {
				const parentNode = event.currentTarget.parentNode;
				// if selector inner element is clicked the position is calculated using it's parent - "selector" element position
				const targetPositions =  parentNode.tagName.toLowerCase().includes('selector')
					? parentNode.getBoundingClientRect()
					: event.target.getBoundingClientRect();
				this.offsetX = targetPositions.x + this.extraOffset.offsetX;
				this.offsetY = targetPositions.y + this.extraOffset.offsetY - (this.isBelowVertical(targetPositions) ? 290 : 0);
			}

			this.cdr.markForCheck();
			this.menuOpened.emit();
		}
	}

	/** Closes the menu. */
	closeMenu(emit = false): void {
		this.menuOpen = false;
		if (emit) {
			this.menuClosed.emit();
			this.searchTxt = '';
			// when we close the menu we want to be focused again
			if (this.tab)
				this.tab.focus();
		}
	}

	onChange(value: any) {
		this.value = value;
		this.onChangeFn(this.value);
		this.update.emit(this.value);
	}
	/**
	 * Whether the target clicked is below the vertical middle
	 * @param  {any} position: clicked target position
	 */
	private isBelowVertical(position: any) {
		return position.y - window.innerHeight / 2 > 20;
	}

}
