import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';

@Component({
	selector: 'panel-tab-app',
	templateUrl: './panel-tab.component.html',
	styleUrls: ['./panel-tab.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelTabComponent implements OnInit {
	@Input() icon: string;
	@Input() name: string;
	@Input() link: string;

	constructor( ) {

	}

	ngOnInit() {
		if (this.link === undefined) {
			throw Error('Please define a link for the tab-component');
		}
	}

}
