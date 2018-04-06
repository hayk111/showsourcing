import { Component, OnInit, Input } from '@angular/core';
import { HostBinding } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

// simply used to have a card component instead of using the class
@Component({
	selector: 'card-app',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
	@Input() elevation = 'z-2';
	@Input() padding = 'l';
	@Input() margin = 'default';
	@Input() className: string;

	@Input() border = false;
	@Input() borderBottom = false;
	@Input() borderColor = 'primary';
	@Input() footerColor: string;

	constructor() { }

	ngOnInit() { }

	get borderStyle() {
		return {
			'background-color': 'var(--color-' + this.borderColor + ')',
		};
	}

	get mainStyle() {
		return {
			padding: 'var(--spacing-' + this.padding + ')',
		};
	}

	get footerStyle() {
		return {};
	}

	get ctnrStyle() {
		return {
			margin: 'var(--spacing-' + this.margin + ')',
		};
	}
}
