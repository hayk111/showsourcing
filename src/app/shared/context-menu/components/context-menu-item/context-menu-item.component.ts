import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'context-menu-item-app',
	templateUrl: './context-menu-item.component.html',
	styleUrls: ['./context-menu-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex pointer'
	}
})
export class ContextMenuItemComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
