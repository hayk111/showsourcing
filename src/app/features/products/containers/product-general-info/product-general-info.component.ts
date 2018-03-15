import { ERM } from '~app/shared/entity';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Product } from '~app/features/products';
import { selectProductById } from '~products/store';
import { AutoUnsub } from '~utils';
import { Event } from '~events/models';
import { selectEventsList } from '~app/features/events';

@Component({
	selector: 'product-general-info-app',
	templateUrl: './product-general-info.component.html',
	styleUrls: ['./product-general-info.component.scss'],
})
export class ProductGeneralInfoComponent extends AutoUnsub implements OnInit {
	product$: Observable<Product>;
	events$: Observable<Array<Event>>;

	categoryRep = ERM.categories;

	constructor(private route: ActivatedRoute, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.product$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			switchMap(params => this.store.select(selectProductById(params.id)))
		);
		this.events$ = this.store.select(selectEventsList);
	}
}
