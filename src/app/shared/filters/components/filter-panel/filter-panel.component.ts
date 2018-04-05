import { ChangeDetectionStrategy, Component, EventEmitter, Output, Input } from '@angular/core';


// merely holds styling of the container
@Component({
	selector: 'filter-panel-app',
	templateUrl: './filter-panel.component.html',
	styleUrls: ['./filter-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-2'
	}
})
export class FilterPanelComponent {
}
