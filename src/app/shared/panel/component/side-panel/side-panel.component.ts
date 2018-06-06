import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

// merely holds styling of the container
@Component({
	selector: 'side-panel-app',
	templateUrl: './side-panel.component.html',
	styleUrls: ['./side-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-2'
	}
})
export class SidePanelComponent {
}
