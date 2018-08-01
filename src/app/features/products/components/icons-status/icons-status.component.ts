import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product } from '~models';

@Component({
	selector: 'icons-status-app',
	templateUrl: './icons-status.component.html',
	styleUrls: ['./icons-status.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconsStatusComponent implements OnInit {

	@Input() product: Product;
	@Input() favorite = false;
	constructor() { }

	ngOnInit() {
	}

	get successStyle() {
		const suc = 'success';
		return {
			background: `var(--color-${suc})`,
			'border-radius': '50%',
			'width': '17px',
			'height': '17px',
			'margin-top': '2px',
		};
	}

}
