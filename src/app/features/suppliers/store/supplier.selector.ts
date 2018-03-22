import { createSelector } from '@ngrx/store';
import { entityStateToArray } from '~app/shared/entity';

export const selectSupplierState = state => state.entities.suppliers;

export const selectSuppliers = createSelector([selectSupplierState], state => entityStateToArray(state));
