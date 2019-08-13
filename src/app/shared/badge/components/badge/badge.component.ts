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
		'[class.warn]': 'color === "warn"',
		'[class.success]': 'color === "success"',
		'[class.accent]': 'color === "accent"',
		'[class.vibrant]': 'color === "vibrant"',
		'[class.flexVAlign]': 'true',
		'[class.flexCenter]': 'true',
		'[class.circle]': 'circle',
		'[class.small]': 'size === "s" || size === "small"',
		'[class.medium]': 'size === "m" || size === "medium"',
		/** @deprecated legacy sizes please remove the scss as well*/
		'[class.tiny]': 'size === "tiny"',
		'[class.mini]': 'size === "mini"',
		'[class.xsmall]': 'size === "xs"',
		'[class.thick]': 'size === "thick"',
		'[class.large]': 'size === "l" || size === "large"'
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
