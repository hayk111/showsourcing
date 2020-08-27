import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Project, Task } from '~core/erm3';
import { api, Sample } from 'showsourcing-api-lib';

@Component({
	selector: 'product-docket-app',
	templateUrl: './product-docket.component.html',
	styleUrls: ['./product-docket.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDocketComponent implements OnInit {
	@Input() product: Product;
	@Output() update = new EventEmitter<Product>();
	@Output() addTask = new EventEmitter<undefined>();
	@Output() addSample = new EventEmitter<undefined>();
	@Output() previewTask = new EventEmitter<Task>();
	@Output() previewSample = new EventEmitter<Sample>();
	@Output() goToTasks = new EventEmitter<null>();
	@Output() goToSamples = new EventEmitter<null>();

	productSamples$: Observable<Sample[]>;
	productTasks$: Observable<Task[]>;

	constructor() { }

	ngOnInit() {
		this.productSamples$ = api.Sample.findByProduct$(this.product.id).data$;
		this.productTasks$ = api.Task.findByProduct$(this.product.id).data$ as Observable<any[]>;
	}

}
