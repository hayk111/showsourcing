import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'filter-selection-panel-app',
	templateUrl: './filter-selection-panel.component.html',
	styleUrls: ['./filter-selection-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSelectionPanelComponent {
	/** when the panel is closed */
	@Output() close = new EventEmitter<null>();

	onDone() {
		this.close.emit();
	}

}
