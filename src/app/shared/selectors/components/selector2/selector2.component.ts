import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'selector2-app',
	templateUrl: './selector2.component.html',
	styleUrls: ['./selector2.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Selector2Component implements OnInit {

	@Input() value: any;
	@Input() type: string;
	@Input() multiple = false;
	@Input() canCreate = false;
	@Input() width = 395;

	@Output() update = new EventEmitter<any>();

	menuOpen = false;

	@Input() offsetX = 0;
	@Input() offsetY = 8;
	@Output() menuClosed = new EventEmitter<any>();


	constructor() { }

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
