import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'filter-btns-panel-app',
	templateUrl: './filter-btns-panel.component.html',
	styleUrls: ['./filter-btns-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterBtnsPanelComponent {
	@Output() reset = new EventEmitter<null>();

}
