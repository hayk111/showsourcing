import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'spinner-app',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
	private _size = 'xxl';
	@Input() width = 5;
	constructor() { }

	ngOnInit() { }

	@Input()
	set size(size: string | number) {
		if (isNaN(size as any))
			this._size = 'var(--spacing-' + size + ')';
		else
			this._size = size + 'px';
	}
	get size() {
		return this._size;
	}

	get style() {
		return { width: this._size };
	}


}
