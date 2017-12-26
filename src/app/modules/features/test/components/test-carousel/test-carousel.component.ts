import { Component, OnInit } from '@angular/core';
import { EntityTarget, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { selectProducts } from '../../../../store/selectors/products.selector';
import { ProductActions } from '../../../../store/action/product.action';
import { map, tap, switchMap } from 'rxjs/operators';
import { ImageActions } from '../../../../store/action/images.action';
import { selectImagesForTarget } from '../../../../store/selectors/image.selector';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-test-carousel',
	templateUrl: './test-carousel.component.html',
	styleUrls: ['./test-carousel.component.scss']
})
export class TestCarouselComponent extends AutoUnsub implements OnInit {
	target$: Observable<EntityTarget>;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		// loading product in case they aren't loaded
		this.store.dispatch(ProductActions.load());
		// we select a product then we load images for it
		this.target$ = this.store.select(selectProducts)
		.takeUntil(this._destroy$)
		.pipe(
			filter(prods => !prods.pending),
			map(prods => {
				const firstId = prods.ids[0];
				return prods.byId[firstId];
			}),
			map(prod => ({entityId: prod.id, entityRepr: entityRepresentationMap.product})),
			tap(target => this.store.dispatch(ImageActions.load(target)))
		);
	}

}
