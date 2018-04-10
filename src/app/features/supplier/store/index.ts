import { fromSupplierProduct } from './product/product.bundle';
import { fromSupplierContact } from './contacts/contact.bundle';
import { EntityState } from '~app/entity';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';




export interface SupplierState {
	product: EntityState<any>;
	contact: EntityState<any>;
}

export const reducers: ActionReducerMap<SupplierState> = {
	product: fromSupplierProduct.reducer,
	contact: fromSupplierContact.reducer,
};

export const selectAuthState = createFeatureSelector<SupplierState>('supplier');

