import { supplierActionTypes, supplierActions, SupplierActions } from './supplier.action';
import { ERM } from '~app/entity/store/entity.model';
import { supplierReducer } from './supplier.reducer';
import { createEntitySelectors, EntityBundle } from '~app/entity/store/entity-bundle';
import { createSelector } from '@ngrx/store';
import { fromCountry, fromTeamMember } from '~app/entity';



export interface SupplierBundle extends EntityBundle {
	Actions: SupplierActions;
}

export const fromSupplier: SupplierBundle = {
	ActionTypes: supplierActionTypes,
	Actions: supplierActions,
	reducer: supplierReducer,
	...createEntitySelectors(ERM.supplier.entityName)
};
