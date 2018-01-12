import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'spinner-app',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
	radius = 65;
	constructor() { }

	ngOnInit() {
	}

	@Input()
	set size(size: string) {
		switch (size) {
			case 'small':
				this.radius = 30;
				break;
			default:
				this.radius = 65;
		}
	}
}
