import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AppImage } from '~models';

@Component({
	selector: 'logo-app',
	templateUrl: './logo.component.html',
	styleUrls: ['./logo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.size-s]': 'size === "s"',
		'[class.size-xs]': 'size === "xs"',
		'[class.size-ms]': 'size === "ms"',
		'[class.size-m]': 'size === "m"',
		'[class.size-l]': 'size === "l"'
	}
})
export class LogoComponent {
	@Input() logo: AppImage;
	@Input() type: string;
	@Input() size: undefined | 'xs' | 's' | 'ms' | 'm' | 'l';

	constructor() { }

	get sizeClass() {
		if (!this.size)
			return;
		else
			return `size-${this.size}`;
	}

}
