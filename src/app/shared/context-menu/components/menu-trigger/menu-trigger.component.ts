import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'menu-trigger-app',
	templateUrl: './menu-trigger.component.html',
	styleUrls: ['./menu-trigger.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuTriggerComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
