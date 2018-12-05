import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'sub-panel-right-item-app',
	templateUrl: './sub-panel-right-item.component.html',
	styleUrls: ['./sub-panel-right-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubPanelRightItemComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
