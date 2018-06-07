import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

// merely holds styling of the container
@Component({
	selector: 'side-panel-app',
	templateUrl: './side-panel.component.html',
	styleUrls: ['./side-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-2',
		'[class.alignRight]': 'align === "right"',
		'[class.alignLeft]': 'align === "left"'
	}
})
export class SidePanelComponent {
	@Input() align: 'left' | 'right' = 'right';
}
