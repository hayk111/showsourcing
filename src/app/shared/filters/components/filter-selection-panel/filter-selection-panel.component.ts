import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'filter-selection-panel-app',
	templateUrl: './filter-selection-panel.component.html',
	styleUrls: ['./filter-selection-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSelectionPanelComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
