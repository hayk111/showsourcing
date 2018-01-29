import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EntityTarget, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../../../store/model/entities/product.model';
import { selectProductById } from '../../../../store/selectors/entities/products.selector';
import { selectCurrentSelection, selectTagsForSelection,
	selectProductSelected } from '../../../../store/selectors/selection/selection.selector';
import { TagSlctnActions } from '../../../../store/action/selection/tag-selection.action';

@Component({
	selector: 'basic-info-box-app',
	templateUrl: './basic-info-box.component.html',
	styleUrls: ['./basic-info-box.component.scss']
})
export class BasicInfoBoxComponent implements OnInit {
	@Input() target: EntityTarget;
	tagsRep = entityRepresentationMap.tags;
	product$: Observable<Product>;
	// those are target tags, so only ids
	tags$: Observable<Array<string>>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.product$ = this.store.select(selectProductSelected);
		this.tags$ = this.store.select(selectTagsForSelection);
	}

	onTagAdded(event) {
		this.store.dispatch(TagSlctnActions.add(event));
	}

	onTagRemoved(event) {
		this.store.dispatch(TagSlctnActions.remove(event));
	}

}
