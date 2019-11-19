import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, Project, Sample, Task } from '~core/models';

@Component({
	selector: 'product-docket-app',
	templateUrl: './product-docket.component.html',
	styleUrls: ['./product-docket.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDocketComponent {
	@Input() product: Product;
	@Output() update = new EventEmitter<Product>();
	@Output() addTask = new EventEmitter<undefined>();
	@Output() addSample = new EventEmitter<undefined>();
	@Output() previewTask = new EventEmitter<Task>();
	@Output() previewSample = new EventEmitter<Sample>();

	constructor() { }

}
