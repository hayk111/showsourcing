import { EntityState } from '~entity';
import { ActionReducerMap } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { productReducer } from './product.reducer';

// tslint:disable-next-line:no-empty-interface
export interface ProductsState extends EntityState<Product> {}
export interface EntitiesState {
	products: ProductsState;
}

export const productRreducers: ActionReducerMap<EntitiesState> = {
	products: productReducer,
};
