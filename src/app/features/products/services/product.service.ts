import { Injectable } from '@angular/core';
import { Patch } from '~app/shared/entity';
import { productActions } from '~app/features/products';
import { Store } from '@ngrx/store';

@Injectable()
export class ProductService {
	// id of selected entities in the view
	private _selection = new Map<string, boolean>();

	constructor(private store: Store<any>) { }

	/** Mark a product as being in the front view, this is used to load related entities */
	focus(id: string) { }

	select(id: string) {
		this._selection.set(id, true);
	}

	unselect(id: string) {
		this._selection.delete(id);
	}

	patch(patch: Patch) {
		this.store.dispatch(productActions.patch(patch));
	}
}
