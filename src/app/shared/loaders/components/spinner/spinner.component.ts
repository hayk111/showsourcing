import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'spinner-app',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
	@Input() private _size;
	constructor() { }

	ngOnInit() { }

	@Input()
	set size(size: string) {
		this._size = size;
	}

	get size() {
		return this._size;
	}
}
