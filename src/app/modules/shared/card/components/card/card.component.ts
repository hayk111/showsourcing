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

	@HostBinding('class.z-2') @Input() elevation = true;
	@HostBinding('class.paddingDefault') @Input() padding = true;
	@HostBinding('class.marginDefault') @Input() margin = true;

	private _border = false;
	@Input() borderColor: undefined;

	constructor() {}

	ngOnInit() {
	}

	@Input()
	set border(b: boolean) {
		this._border = b;
		if (b)
			this.padding = false;
	}

	get border() {
		return this._border;
	}

}
