import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'spinner-app',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
	@Input() size;
	constructor() { }

	ngOnInit() {
	}

}
