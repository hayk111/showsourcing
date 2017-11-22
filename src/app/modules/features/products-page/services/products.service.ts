// import { Injectable } from '@angular/core';
// import { TeamItemLoaderService } from '../../../shared/filtered-list-page/services/team-item-loader.service';
// import { tagReducer } from '../../../store/reducer/tag.reducer';
// import { filter, map, switchMap } from 'rxjs/operators';
// import { FilterGroupName } from '../../../store/model/filter.model';
// import { Store } from '@ngrx/store';
// import { FilterActions } from '../../../store/action/filter.action';
// import { ProductActions } from '../../../store/action/product.action';
// import { Subscription } from 'rxjs/Subscription';
// import { Product } from '../../../store/model/product.model';

// @Injectable()
// export class ProductsService {
// 	filterGroupName = FilterGroupName.PRODUCT_PAGE;
// 	subscription: Subscription;
// 	private suppliers$;
// 	private suppliers;

// 	constructor(private itemLoader: TeamItemLoaderService, private store: Store<any>) {
// 		this.suppliers$ = this.store.select('suppliers')
// 		.pipe(
// 			// check if it's not empty
// 			filter( s => s && s.length > 0),
// 			map(s => s.byId)
// 		);
// 	}

// 	init(filterGroupName: FilterGroupName) {
// 		this.unsub();
// 		this.store.dispatch(ProductActions.setPending());
// 		this.subscription = this.suppliers$.pipe(
// 			switchMap(s => {
// 				debugger;
// 				this.suppliers = s;
// 				return this.itemLoader.loadEntity('product', filterGroupName);
// 			})
// 		).subscribe((r: {elements: Array<any>}) => {
// 			debugger;
// 				this.attachSupplierNames(r.elements);
// 				this.store.dispatch(ProductActions.setData(r.elements));
// 		});
// 	}

// 	private attachSupplierNames(arr: Array<Product>) {
// 		arr.forEach(product => {
// 			const supId = product.supplierId;
// 			const supplier = this.suppliers[supId];
// 			debugger;
// 		});
// 	}

// 	private unsub() {
// 		if (this.subscription)
// 			this.subscription.unsubscribe();
// 	}

// }
