import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ListPageService } from '~core/list-page';
import { ProductFeatureService } from '~features/products/services';
import { Product } from '~models';
import { AutoUnsub } from '~utils';



@Component({
	selector: 'activity-page-app',
	templateUrl: './activity-page.component.html',
	styleUrls: ['./activity-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class ActivityPageComponent extends AutoUnsub implements OnInit {
	product$: Observable<Product>;

	constructor(
		private route: ActivatedRoute,
		private productSrv: ProductFeatureService,
		public listSrv: ListPageService<any, any>
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.params.pipe(
			map(params => params.id)
		);
		this.product$ = id$.pipe(
			switchMap(id => this.productSrv.selectOne(id)),
		);

	}

}
