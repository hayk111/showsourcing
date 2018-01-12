import { Component, OnInit, Input } from '@angular/core';
import { EntityTarget } from '../../../../store/utils/entities.utils';

@Component({
	selector: 'product-side-preview-app',
	templateUrl: './product-side-preview.component.html',
	styleUrls: ['./product-side-preview.component.scss']
})
export class ProductSidePreviewComponent implements OnInit {
	@Input() target: EntityTarget;
	constructor() { }

	ngOnInit() {
	}

}
