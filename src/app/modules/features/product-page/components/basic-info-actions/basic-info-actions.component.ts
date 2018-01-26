import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../../../store/action/entities/product.action';

@Component({
	selector: 'basic-info-actions-app',
	templateUrl: './basic-info-actions.component.html',
	styleUrls: ['./basic-info-actions.component.scss']
})
export class BasicInfoActionsComponent implements OnInit {
	@Input() productId;
	constructor(private store: Store<any>) { }

	ngOnInit() {
	}

	reqPdf() {
		this.store.dispatch(ProductActions.requestPdf(this.productId));
	}

}
