import { ScrollStrategy, ScrollStrategyOptions, ConnectedPosition } from '@angular/cdk/overlay';
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
	/** activates the scroll strategy applied by the CDK directive */
	@Input() closeOnScroll = false;
	@Input() offsetX = 0;
	@Input() offsetY = 8;
	@Output() menuClosed = new EventEmitter<any>();
	scrollStrat: ScrollStrategy;

	constructor(private sso: ScrollStrategyOptions) { }

	ngOnInit() {
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
