import { Component, OnInit, Input } from '@angular/core';
import { HostBinding } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

// simply used to have a card component instead of using the class
@Component({
	selector: 'card-app',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
	@HostBinding('class.card') card = true;
	@Input() border = false;
	private _padding = 'default';

	constructor() {}

	ngOnInit() {
	}

	@HostBinding('class.noPadding')
	get noPadding() {
		return this.border || this._padding === 'none';
	}

	@HostBinding('class.smallPadding')
	get smallPadding() {
		return this._padding === 'small';
	}

	@Input()
	set padding(v: string) {
		this._padding = v;
	}

}
