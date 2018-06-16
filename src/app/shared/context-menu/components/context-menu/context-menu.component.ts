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
export class ContextMenuComponent {
	/** Position of the menu in the X axis.*/
	@Input() xPosition = 16;
	/** Position of the menu in the Y axis. */
	@Input() yPosition = 16;
	menuOpen = false;



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
