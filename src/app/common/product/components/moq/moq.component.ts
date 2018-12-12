import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'moq-app',
	templateUrl: './moq.component.html',
	styleUrls: ['./moq.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoqComponent implements OnInit {
	@Input() big = false;
	@Input() fontWeight = 'inherit';
	@Input() size = 'inherit';
	// price are 10000 times less than what comes back from the server
	// @input in setter
	private _amount: number;

	constructor() { }

	ngOnInit() { }

	@Input()
	get amount() {
		return this._amount;
	}

	set amount(v: number) {
		this._amount = v;
	}

	get styles() {
		return {
			'font-weight': this.fontWeight,
			'font-size':
				this.size === 'inherit' ? 'inherit' : 'var(--font-size-' + this.size + ')',
		};
	}
}
