import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../store/model/entities/product.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { selectProductSelected, selectCommentsArrayForSelection, selectNumCommentsForSelection, selectNumTasksForSelection } from '../../../../store/selectors/selection/selection.selector';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { takeUntil, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
	selector: 'product-big-card-app',
	templateUrl: './product-big-card.component.html',
	styleUrls: ['./product-big-card.component.scss']
})
export class ProductBigCardComponent extends AutoUnsub implements OnInit {
	product: Product;
	numComments: number;
	numTasks: number;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.store.select(selectProductSelected)
			.pipe(takeUntil(this._destroy$)).subscribe(p => this.product = p);
		this.store.select(selectNumCommentsForSelection)
			.pipe(takeUntil(this._destroy$)).subscribe(n => this.numComments = n);
		this.store.select(selectNumTasksForSelection)
			.pipe(takeUntil(this._destroy$)).subscribe(n => this.numTasks = n);

	}

}
