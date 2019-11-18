import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

/** component that triggers the opening of the menu */
@Component({
	selector: 'context-menu-trigger-app',
	templateUrl: './context-menu-trigger.component.html',
	styleUrls: ['./context-menu-trigger.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'pointer'
	}
})
export class ContextMenuTriggerComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
