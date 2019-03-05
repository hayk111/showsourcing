import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { EntityMetadata, ERM } from '~core/models';

@Component({
	selector: 'selector-app',
	templateUrl: './selector.component.html',
	styleUrls: ['./selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent implements OnInit {

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
	@Input() width = 395;

	@Output() update = new EventEmitter<any>();

	menuOpen = false;

	@Input() offsetX = 0;
	@Input() offsetY = 8;
	@Output() menuClosed = new EventEmitter<any>();

	// we need this in order to calculate dynamically the offsetX on preview badges
	constructor(public elem: ElementRef) { }

	ngOnInit() {
	}

	/** Toggles the menu between the open and closed states. */
	toggleMenu(): void {
		this.menuOpen ? this.closeMenu() : this.openMenu();
	}

	/** Opens the menu. */
	openMenu(): void {
		this.menuOpen = true;
	}

	/** Closes the menu. */
	closeMenu(emit = false): void {
		this.menuOpen = false;
		if (emit) {
			this.menuClosed.emit();
		}
	}
}
