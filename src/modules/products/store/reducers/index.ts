import { ActionReducerMap } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { productReducer, ProductState } from './product.reducer';

export interface EntitiesState {
	products: ProductState;
}

export const productRreducers: ActionReducerMap<EntitiesState> = {
	products: productReducer,
};
