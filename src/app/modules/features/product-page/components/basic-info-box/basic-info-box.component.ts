import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EntityTarget, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../../../store/model/entities/product.model';
import { selectProductById } from '../../../../store/selectors/entities/products.selector';
import { ProductActions } from '../../../../store/action/entities/product.action';

@Component({
	selector: 'basic-info-box-app',
	templateUrl: './basic-info-box.component.html',
	styleUrls: ['./basic-info-box.component.scss']
})
export class BasicInfoBoxComponent implements OnInit {
	@Input() target: EntityTarget;
	tagsRep = entityRepresentationMap.tags;
	product$: Observable<Product>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.product$ = this.store.select(selectProductById(this.target.entityId));
	}

	onTagAdded(event) {
		this.store.dispatch(ProductActions.addTags([event], this.target));
	}

	onTagRemoved(event) {
		this.store.dispatch(ProductActions.removeTag(event, this.target));
	}

}
