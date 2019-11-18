import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'context-menu-item-app',
	templateUrl: './context-menu-item.component.html',
	styleUrls: ['./context-menu-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex pointer capitalize'
	}
})
export class ContextMenuItemComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
