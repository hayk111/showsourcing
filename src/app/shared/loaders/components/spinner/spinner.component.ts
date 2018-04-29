import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'spinner-app',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
	@Input() size = 'xxl';
	@Input() width = 5;
	constructor() { }

	ngOnInit() { }


	get style() {
		let width;
		if (isNaN(this.size as any))
			width = 'var(--spacing-' + this.size + ')';
		else
			width = this.size + 'px';
		return { width, height: width };
	}


}
