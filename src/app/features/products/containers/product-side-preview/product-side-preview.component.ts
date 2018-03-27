import { Component, OnInit, Input } from '@angular/core';
import { EntityTarget, selectFocussedEntity } from '~entity';
import { Store } from '@ngrx/store';

@Component({
	selector: 'product-side-preview-app',
	templateUrl: './product-side-preview.component.html',
	styleUrls: ['./product-side-preview.component.scss'],
})
export class ProductSidePreviewComponent implements OnInit {
	target$;
	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.target$ = this.store.select(selectFocussedEntity);
	}
}
