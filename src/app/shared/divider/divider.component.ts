import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'divider-app',
	template: '',
	styleUrls: ['./divider.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'role': 'separator',
		'[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
		'[class.vertical]': 'vertical',
	}
})
export class DividerComponent {

	/** Whether the divider is vertically aligned. */
	@Input() vertical = false;

}
