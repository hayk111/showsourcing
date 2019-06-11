import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'bottom-panel-app',
	templateUrl: './bottom-panel.component.html',
	styleUrls: ['./bottom-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomPanelComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
