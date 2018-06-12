import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, TemplateRef, ComponentFactoryResolver } from '@angular/core';


export type MenuPositionX = 'before' | 'after';

export type MenuPositionY = 'above' | 'below';

/**
 * Opens a menu when x is clicked
 */
@Component({
	selector: 'context-menu-app',
	templateUrl: './context-menu.component.html',
	styleUrls: ['./context-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'aria-haspopup': 'true',
	}
})
export class ContextMenuComponent implements OnInit {
	private _xPosition: MenuPositionX = 'after';
	private _yPosition: MenuPositionY = 'below';
	/** Config object to be passed into the menu's ngClass */
	classList: { [key: string]: boolean } = {};
	menuOpen = false;

	constructor() { }

	ngOnInit() {
	}

	/** Position of the menu in the X axis. */
	@Input()
	get xPosition(): MenuPositionX { return this._xPosition; }
	set xPosition(value: MenuPositionX) {
		if (value !== 'before' && value !== 'after') {
			throw Error('xPosition is contextMenu should be either before or after');
		}
		this._xPosition = value;
		this.setPositionClasses();
	}

	/** Position of the menu in the Y axis. */
	@Input()
	get yPosition(): MenuPositionY { return this._yPosition; }
	set yPosition(value: MenuPositionY) {
		if (value !== 'above' && value !== 'below') {
			throw Error('yPosition is contextMenu should be either above or below');
		}
		this._yPosition = value;
		this.setPositionClasses();
	}

	/**
 * Adds classes to the menu panel based on its position. Can be used by
 * consumers to add specific styling based on the position.
 * @param posX Position of the menu along the x axis.
 * @param posY Position of the menu along the y axis.
 */
	setPositionClasses(posX: MenuPositionX = this.xPosition, posY: MenuPositionY = this.yPosition) {
		const classes = this.classList;
		classes['menu-before'] = posX === 'before';
		classes['menu-after'] = posX === 'after';
		classes['menu-above'] = posY === 'above';
		classes['menu-below'] = posY === 'below';
	}


	/** Toggles the menu between the open and closed states. */
	toggleMenu(): void {
		return this.menuOpen ? this.closeMenu() : this.openMenu();
	}

	/** Opens the menu. */
	openMenu(): void {
		this.menuOpen = true;
	}

	/** Closes the menu. */
	closeMenu(): void {
		this.menuOpen = false;
	}

}
