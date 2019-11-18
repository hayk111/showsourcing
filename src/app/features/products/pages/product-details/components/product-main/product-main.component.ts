import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product } from '~core/models';

@Component({
	selector: 'product-main-app',
	templateUrl: './product-main.component.html',
	styleUrls: ['./product-main.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductMainComponent {
	@Input() product: Product;

	getCount(type: string) {
		if (!this.product)
			return;

		switch (type) {
			case 'tasks':
				return this.product.tasksLinked.count;
			case 'files':
				return this.product.attachments.length;
			case 'samples':
				return this.product.samplesLinked.count;
			case 'requests':
				return 0; // TODO find a solution for this
			case 'comments':
				return this.product.comments.length;
			default:
				return 'INVALID';
		}
	}
}
