import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'selector-content-stored-app',
	templateUrl: './selector-content-stored.component.html',
	styleUrls: ['./selector-content-stored.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flexWrap'
	}
})
export class SelectorContentStoredComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
