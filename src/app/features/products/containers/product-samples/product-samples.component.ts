import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'product-samples-app',
	templateUrl: './product-samples.component.html',
	styleUrls: ['./product-samples.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSamplesComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
