import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProductFeatureService } from '~features/products/services';
import { ERM, Product } from '~models';
import { AutoUnsub } from '~utils';
import { Counts } from './product-activity-nav/product-activity-nav.component';




@Component({
	selector: 'product-activity-app',
	templateUrl: './product-activity.component.html',
	styleUrls: ['./product-activity.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductActivityComponent extends AutoUnsub implements OnInit {
	selectedTab = 'comment';
	product$: Observable<Product>;
	counts$: Observable<Counts>;
	typeEntity = ERM.PRODUCT;

	constructor(
		private route: ActivatedRoute,
		private featureSrv: ProductFeatureService) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.parent.params.pipe(
			map(params => params.id),
		);
		const product$ = id$.pipe(switchMap(id => this.featureSrv.selectOne(id)));
		this.counts$ = product$.pipe(
			map(product => this.featureSrv.getActivityCount(product) )
		);
	}

}
