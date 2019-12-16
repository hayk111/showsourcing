import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'context-menu-item-warn-app',
	templateUrl: './context-menu-item-warn.component.html',
	styleUrls: ['./context-menu-item-warn.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'color-warn flex pointer capitalize'
	}
})
export class ContextMenuItemWarnComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
