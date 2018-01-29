import { Component, OnInit } from '@angular/core';
import { EntityTarget, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { selectProducts } from '../../../../store/selectors/entities/products.selector';
import { ProductActions } from '../../../../store/action/entities/product.action';
import { map, tap, switchMap } from 'rxjs/operators';
import { ImageActions } from '../../../../store/action/entities/images.action';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { getFirstProductEntityTarget } from '../../utils.utils';

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
		// this.store.dispatch(ProductActions.load());
		// we select a product then we load images for it
		this.target$ = getFirstProductEntityTarget(this.store, this._destroy$)
		.pipe(
			tap(target => this.store.dispatch(ImageActions.load(target)))
		);
	}

}
