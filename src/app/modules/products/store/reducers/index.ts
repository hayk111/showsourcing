import { ActionReducerMap } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { reducer, ProductState } from './product.reducer';

export interface EntitiesState {
	products: ProductState;
}

export const reducers: ActionReducerMap<EntitiesState> = {
	products: reducer
};
