import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'spinner-app',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
	@Input() private _size;
	arcs = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 ];
	constructor() { }

	ngOnInit() {
	}

	@Input() set size(size: string) {
		// let's put less arcs on the smaller loader
		// it gives a cooler effects.
		if (size === 'xsmall')
			this.arcs = [0, 6, 12, 18, 24]
		this._size = size;
	}

	get size() {
		return this._size;
	}

}
