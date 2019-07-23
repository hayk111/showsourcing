import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '~models/product.model';
import { ERM } from '~models/_erm.enum';
import { AttachmentService } from '~core/entity-services';

@Component({
	selector: 'preview-top-panel-app',
	templateUrl: './preview-top-panel.component.html',
	styleUrls: ['./preview-top-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTopPanelComponent implements OnInit {
	@Input() product: Product;
	@Input() selectedIndex: number;
	@Output () delete = new EventEmitter<Product>();
	@Output () close = new EventEmitter<any>();
	productEntity = ERM.PRODUCT;

	constructor(private attachmentSrv: AttachmentService) { }

	ngOnInit() {
	}

	getImg() {
		return this.product.images ? this.product.images[this.selectedIndex] : null;
	}
}
