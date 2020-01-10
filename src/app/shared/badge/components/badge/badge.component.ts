import { Component, Input } from '@angular/core';
import { Colors } from '~utils';

@Component({
	selector: 'badge-app',
	templateUrl: './badge.component.html',
	styleUrls: ['./badge.component.scss'],
	host: {
		'[class.small]': 'size === "s"',
		'[class.medium-small]': 'size === "ms"',
		'[class.medium]': 'size === "m"',
		'[class.large]': 'size === "l"',
		/** @deprecated */
		'[class.primary]': 'color === "primary"',
		'[class.secondary]': 'color === "secondary"',
		'[class.secondary-light]': 'color === "secondary-light"',
		'[class.warn]': 'color === "warn"',
		'[class.success]': 'color === "success"',
		'[class.accent]': 'color === "accent"',
		'[class.vibrant]': 'color === "vibrant"',
		'[class.flexVAlign]': 'true',
		'[class.flexCenter]': 'true',
		'[class.circle]': 'circle',
	}
})
export class BadgeComponent {
	@Input() color = 'secondary';
	@Input() size: 's' | 'ms' | 'm' | 'l' = 's';

	/** @deprecated use color */
	@Input() set type(color: Colors) {
		this.color = color;
	}
	/** @deprecated */
	@Input() circle = false;
}
