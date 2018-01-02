import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EntityTarget, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../../../store/model/product.model';
import { selectProductById } from '../../../../store/selectors/products.selector';

@Component({
	selector: 'basic-info-box-app',
	templateUrl: './basic-info-box.component.html',
	styleUrls: ['./basic-info-box.component.scss']
})
export class BasicInfoBoxComponent implements OnInit {
	@Input() target: EntityTarget;
	@Output() tagAdded = new EventEmitter();
	@Output() tagRemoved = new EventEmitter();
	tagsRep = entityRepresentationMap.tags;
	product$: Observable<Product>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.product$ = this.store.select(selectProductById(this.target.entityId));
	}


}
