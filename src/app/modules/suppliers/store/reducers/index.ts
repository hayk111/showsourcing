export * from './supplier.reducer';

import { ActionReducerMap } from '@ngrx/store';
import { Supplier } from '../../models';
import { reducer, SupplierState } from './supplier.reducer';

export interface EntitiesState {
	suppliers: SupplierState;
}

export const reducers: ActionReducerMap<EntitiesState> = {
	suppliers: reducer
};
