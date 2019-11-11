import { Component, Input } from '@angular/core';
import { Colors } from '~utils';

@Component({
	selector: 'badge-app',
	templateUrl: './badge.component.html',
	styleUrls: ['./badge.component.scss'],
	/** @deprecated */
	host: {
		'[class.primary]': 'color === "primary"',
		'[class.secondary]': 'color === "secondary"',
		'[class.secondary-light]': 'color === "secondary-light"',
		'[class.warn]': 'color === "warn"',
		'[class.success]': 'color === "success"',
		'[class.accent]': 'color === "accent"',
		'[class.vibrant]': 'color === "vibrant"',
		'[class.count]': 'color === "count"',
		'[class.flexVAlign]': 'true',
		'[class.flexCenter]': 'true',
		'[class.circle]': 'circle',
		'[class.small]': 'size === "s" || size === "small"',
		'[class.medium]': 'size === "m" || size === "medium"',
	}
})
export class BadgeComponent {
	@Input() color = 'secondary';

	/** @deprecated use color */
	@Input() set type(color: Colors) {
		this.color = color;
	}
	/** @deprecated */
	@Input() size = 's';
	@Input() circle = false;
}
