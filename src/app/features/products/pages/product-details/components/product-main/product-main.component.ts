import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'product-main-app',
	templateUrl: './product-main.component.html',
	styleUrls: ['./product-main.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductMainComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
