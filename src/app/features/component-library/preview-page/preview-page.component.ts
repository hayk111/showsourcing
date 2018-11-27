import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ERM } from '~models';

@Component({
	selector: 'preview-page-app',
	templateUrl: './preview-page.component.html',
	styleUrls: ['./preview-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewPageComponent implements OnInit {

	toggle = false;
	icons = ['product', 'supplier'];
	entityMD = ERM.PRODUCT;

	constructor() { }

	ngOnInit() {
	}

}
