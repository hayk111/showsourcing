import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../../../store/action/product.action';
import { Product } from '../../../../store/model/product.model';
import { AppFile } from '../../../../store/model/app-file.model';
import { AppComment } from '../../../../store/model/comment.model';
import { Observable } from 'rxjs/Observable';
import { selectProductById } from '../../../../store/selectors/products.selector';

@Component({
	selector: 'product-page-app',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent extends AutoUnsub implements OnInit {
	product$: Observable<Product>;
	files: Array<AppFile>;
	comments: Array<AppComment>;


	constructor(private route: ActivatedRoute, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.route.params.takeUntil(this._destroy$)
		.subscribe(params => {
			this.store.dispatch(ProductActions.loadOne(params['id']));
			this.product$ = this.store.select(selectProductById(params['id']));
		});
	}


}
