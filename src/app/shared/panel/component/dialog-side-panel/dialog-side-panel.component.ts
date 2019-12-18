import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

/** @Deprecated */
// merely holds styling of the container
@Component({
	selector: 'dialog-side-panel-app',
	templateUrl: './dialog-side-panel.component.html',
	styleUrls: ['./dialog-side-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-2',
		'[class.alignRight]': 'align === "right"',
		'[class.alignLeft]': 'align === "left"'
	}
})
export class DialogSidePanelComponent {
	@Input() align: 'left' | 'right' = 'right';
}
