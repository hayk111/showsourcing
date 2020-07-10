import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '~core/erm';
import { api, Typename } from 'showsourcing-api-lib';

@Component({
	selector: 'product-main-app',
	templateUrl: './product-main.component.html',
	styleUrls: ['./product-main.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductMainComponent implements OnInit {
	@Input() product: Product;

	sampleCount$: Observable<number>;
	taskCount$: Observable<number>;
	commentCount$: Observable<number>;

	ngOnInit() {
		this.sampleCount$ = api.Sample.findByProduct(this.product.id).count$;
		this.taskCount$ = api.Task.findByProduct(this.product.id).count$;
		this.commentCount$ =  api.Comment.findByNodeId('product:' + this.product.id).count$;

		this.commentCount$.subscribe(count => {
			console.log('ProductMainComponent -> ngOnInit -> count', count);
		});

	}
}
