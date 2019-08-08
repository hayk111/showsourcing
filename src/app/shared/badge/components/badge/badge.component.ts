import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'badge-app',
	templateUrl: './badge.component.html',
	styleUrls: ['./badge.component.scss'],
	/** @deprecated */
	host: {
		'[class.primary]': 'type === "primary"',
		'[class.secondary]': 'type === "secondary"',
		'[class.warn]': 'type === "warn"',
		'[class.success]': 'type === "success"',
		'[class.accent]': 'type === "accent"',
		'[class.vibrant]': 'type === "vibrant"',
		'[class.small]': 'size === "s" || size === "small"',
		'[class.medium]': 'size === "m" || size === "medium"',
		'[class.flexVAlign]': 'true',
		'[class.flexCenter]': 'true',
		/** @deprecated we won't have rounds anymore*/
		'[class.round]': 'round',
		/** @deprecated legacy sizes please remove the scss as well*/
		'[class.tiny]': 'size === "tiny"',
		'[class.mini]': 'size === "mini"',
		'[class.xsmall]': 'size === "xs"',
		'[class.thick]': 'size === "thick"',
		'[class.large]': 'size === "l" || size === "large"'
	}
})
export class BadgeComponent {
	@Input() type: 'primary' | 'secondary' | 'accent' | 'vibrant' | 'success' | 'warn' | 'none' = 'secondary';
	@Input() size = 's';
	/** type gives us the possibility to have predefined color set
	 * for background and color. The none type is when we want to inherit
	 */
	/** @deprecated */
	@Input() round = false;
}
