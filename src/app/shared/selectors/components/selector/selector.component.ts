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
import { EntityMetadata, ERM } from '~core/models';
import { FilterList } from '~shared/filters';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { TabFocusDirective } from '~shared/utils';

import { PickerField } from '../selector-picker/selector-picker.component';

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
	@Input() filterList = new FilterList([]);
	@Input() width = 395;
	@Input() pickerFields: PickerField[];

	@Output() update = new EventEmitter<any>();

	// some times we want to focus the focus directive on the content inside the selector
	@ContentChild(TabFocusDirective) tab: TabFocusDirective;

	menuOpen = false;

	@Input() offsetX = 0;
	@Input() offsetY = 8;
	@Input() disabled = false;
	@Output() menuClosed = new EventEmitter<any>();

	// we need this in order to calculate dynamically the offsetX on preview badges
	constructor(public elem: ElementRef, private cdr: ChangeDetectorRef) { super(cdr); }

	ngOnInit() {
		// everytime we focus the content and hit enter, we are opening the menu
		if (this.tab)
			this.tab.keyEnter.subscribe(_ => this.openMenu());
	}

	/** Toggles the menu between the open and closed states. */
	toggleMenu(): void {
		this.menuOpen ? this.closeMenu() : this.openMenu();
	}

	/** Opens the menu. */
	openMenu(): void {
		if (!this.disabled) {
			this.menuOpen = true;
			this.cdr.markForCheck();
		}
	}

	/** Closes the menu. */
	closeMenu(emit = false): void {
		this.menuOpen = false;
		if (emit) {
			this.menuClosed.emit();
			// when we close the menu we want to be focused again
			if (this.tab)
				this.tab.focusOrigin();
		}
	}

	onChange(value: any) {
		this.value = value;
		this.onChangeFn(this.value);
		this.update.emit(this.value);
	}
}
