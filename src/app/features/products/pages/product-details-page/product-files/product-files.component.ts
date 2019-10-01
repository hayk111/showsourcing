import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProductService } from '~core/entity-services';
import { Product } from '~core/models';
import { AutoUnsub } from '~utils';


@Component({
	selector: 'product-files-app',
	templateUrl: './product-files.component.html',
	styleUrls: ['./product-files.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFilesComponent extends AutoUnsub implements OnInit {

	product$: Observable<Product>;
	product: Product;

	constructor(
		private route: ActivatedRoute,
		private productSrv: ProductService,
		private cd: ChangeDetectorRef
	) {
		super();
	}

	ngOnInit() {
		this.product$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			switchMap(params => this.productSrv.selectOne(params.id)),
			tap(product => this.product = product),
			tap(_ => this.cd.markForCheck())
		);
	}

}
