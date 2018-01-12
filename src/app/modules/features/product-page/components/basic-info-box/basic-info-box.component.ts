import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EntityTarget, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../../../store/model/product.model';
import { selectProductById } from '../../../../store/selectors/products.selector';
import { selectTagsForTarget } from '../../../../store/selectors/target/tag.selector';
import { TargetTagActions } from '../../../../store/action/target/tag.action';

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
		this.product$ = this.store.select(selectProductById(this.target.entityId));
		this.store.dispatch(TargetTagActions.load(this.target));
		this.tags$ = this.store.select(selectTagsForTarget);
	}

	onTagAdded(event) {
		this.store.dispatch(TargetTagActions.add(event, this.target));
	}

	onTagRemoved(event) {
		this.store.dispatch(TargetTagActions.remove(event, this.target));
	}

}
