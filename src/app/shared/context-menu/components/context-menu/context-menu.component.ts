import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


export type MenuPositionX = 'before' | 'after';

export type MenuPositionY = 'above' | 'below';

/**
 * Opens a menu when x is clicked
 */
@Component({
	selector: 'context-menu-app',
	templateUrl: './context-menu.component.html',
	styleUrls: ['./context-menu.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'aria-haspopup': 'true',
	}
})
export class ContextMenuComponent implements OnInit {

	@Input() menuOpen = false;
	@Input() closeOnScroll = false;
	@Output() menuClosed = new EventEmitter<any>();

	scrollStrat: ScrollStrategy;

	constructor(private sso: ScrollStrategyOptions) { }

	ngOnInit() {
		// this works but when the content closes from scrolling, it cannot be open again
		this.scrollStrat = this.closeOnScroll ? this.sso.close() : this.sso.reposition();
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

	/** Disable defaut drag for element */
	preventDrag(event) {
		event.preventDefault();
		return false;
	}

}
