import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'sub-panel-left-item-app',
	templateUrl: './sub-panel-left-item.component.html',
	styleUrls: ['./sub-panel-left-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubPanelLeftItemComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
