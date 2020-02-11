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
} from '@angular/core';
import { debounceTime, tap } from 'rxjs/operators';
import { EntityMetadata, ERM } from '~core/erm';
import { DynamicField } from '~shared/dynamic-forms';
import { FilterList } from '~shared/filters/models/filter-list.class';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { TabFocusActionDirective } from '~shared/utils';
import { ID } from '~utils';

@Component({
	selector: 'selector-app',
	templateUrl: './selector.component.html',
	styleUrls: ['./selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(SelectorComponent)]
})
export class SelectorComponent extends AbstractInput implements OnInit {

	@Input() value: any;
	private _type: EntityMetadata;
	// it can be both types, since selectors are used inside dynamic forms (customField.metadata.target)
	@Input() set type(type: EntityMetadata | string) {
		this._type = typeof (type) === 'string' ? ERM.getEntityMetadata(type) : type;
	}
	get type() {
		return this._type;
	}
	@Input() multiple = false;
	@Input() canCreate = false;
	@Input() hasPicker = true;
	@Input() filterList = new FilterList([]);
	@Input() width = 395;
	@Input() offsetX = 0;
	@Input() offsetY = 8;
	@Input() disabled = false;
	@Input() dynamicFields: DynamicField[];
	// we use it only if we have to initialize the selector with a search
	@Input() searchTxt = '';
	// wheter the selector opens to the most right side or the most left side
	@Input() leftSideOrientation = false;
	/**
	 * this is used when we have a selector that uses Selector Elements, so we can know which selectors elements
	 * we need to query
	 */
	@Input() definitionReference: ID;

	@Output() menuClosed = new EventEmitter<any>();
	@Output() update = new EventEmitter<any>();

	// some times we want to focus the focus directive on the content inside the selector
	@ContentChild(TabFocusActionDirective, { static: true }) tab: TabFocusActionDirective;

	menuOpen = false;
	erm = ERM;


	// we need this in order to calculate dynamically the offsetX on preview badges
	constructor(
		public elem: ElementRef,
		private cdr: ChangeDetectorRef
	) { super(cdr); }

	ngOnInit() {
		// everytime we focus the content and hit enter, we are opening the menu
		if (this.tab) {
			let word = '';
			this.tab.typing.pipe(
				tap(key => word += key),
				debounceTime(300),
			).subscribe(_ => {
				this.openMenu(word);
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
	openMenu(searchTxt?: string): void {
		if (!this.disabled) {
			if (searchTxt)
				this.searchTxt = searchTxt;
			this.menuOpen = true;
			this.cdr.markForCheck();
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
}
