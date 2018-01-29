import { Component, OnInit, Input } from '@angular/core';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { selectSuppliers } from '../../../../store/selectors/entities/suppliers.selector';
import { selectCurrentSelection } from '../../../../store/selectors/selection/selection.selector';

@Component({
	selector: 'product-side-preview-app',
	templateUrl: './product-side-preview.component.html',
	styleUrls: ['./product-side-preview.component.scss']
})
export class ProductSidePreviewComponent implements OnInit {
	target$;
	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.target$ = this.store.select(selectCurrentSelection);
	}

}
