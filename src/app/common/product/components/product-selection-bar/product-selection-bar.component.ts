import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'product-selection-bar-app',
	templateUrl: './product-selection-bar.component.html',
	styleUrls: ['./product-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSelectionBarComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
