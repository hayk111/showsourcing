import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'selector-product-row-app',
	templateUrl: './selector-product-row.component.html',
	styleUrls: ['./selector-product-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorProductRowComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
